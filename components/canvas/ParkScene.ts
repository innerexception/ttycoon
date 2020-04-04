import { Scene, GameObjects, Tilemaps, Geom } from "phaser";
import { store } from "../../App";
import { defaults, SpriteIndexes, Buildings } from '../../assets/Assets'
import { Modal, UIReducerActions, BuildingType } from "../../enum";
import * as v4 from 'uuid'
import { onDayOver, onShowSell, onTransactionComplete, onShowModal, onPlacedBuilding, onPlacedAnimal } from "../uiManager/Thunks";
import { findValue, hasCapacity } from "../Util";
import BuildingSprite from "./BuildingSprite";
import MeatTruck from "./MeatTruck";
import AnimalTruck from "./AnimalTruck";


export default class ParkScene extends Scene {

    unsubscribeRedux: Function
    selectIcon: GameObjects.Image
    selectedPlot: GameObjects.TileSprite
    sounds: any
    plotSprites: Array<GameObjects.TileSprite>
    buildingSprites: Array<BuildingSprite>
    placingBuilding: BuildingSprite
    placingAnimal: GameObjects.Sprite
    placingAnimalType: AnimalType
    targetBuilding: BuildingSprite
    tempBuilding: Building
    map:Tilemaps.Tilemap
    baseLayer: Tilemaps.StaticTilemapLayer
    focusedItem: GameObjects.Sprite
    avatar:GameObjects.Sprite
    ticks:number
    meatTruck: MeatTruck
    animalTruck: AnimalTruck

    constructor(config){
        super(config)
        this.unsubscribeRedux = store.subscribe(this.onReduxUpdate)
        this.plotSprites = []
        this.buildingSprites = []
        this.ticks = 0
    }

    preload = () =>
    {
        defaults.forEach(asset=>{
            (this.load[asset.type] as any)(asset.key, asset.resource, asset.data)
        })
        console.log('assets were loaded.')
    }
    
    onReduxUpdate = () => {
        const uiState = store.getState()
        let engineEvent = uiState.engineEvent
        if(engineEvent)
            switch(engineEvent){
                case UIReducerActions.MUTE:
                    if(this.sound.volume > 0) this.sound.volume = 0
                    else this.sound.volume = 0.1
                    break
                case UIReducerActions.BUY: 
                    //Run buy animation
                    this.buildingSprites.push(this.placingBuilding)
                    this.placingBuilding = null
                    break
                case UIReducerActions.PLACED_ANIMAL:
                    this.targetBuilding.addAnimal(this.placingAnimalType)
                    this.placingAnimal.destroy()
                    this.placingAnimal = null
                    break
                case UIReducerActions.SUMMON_ANIMAL_TRUCK:
                    this.animalTruck.enter()
                    break
                case UIReducerActions.DISMISS_ANIMAL_TRUCK:
                    this.animalTruck.exit()
                    break
                // case UIReducerActions.PLACE_ANIMAL:
                //     this.placingAnimal = new AnimalSprite()
                //     break
            }
    }

    create = () =>
    {
        this.sound.volume = 0.1
        this.sounds = {
            step: this.sound.add('step'),
            dead: this.sound.add('dead'),
            error: this.sound.add('error')
        }

        this.map = this.make.tilemap({ key: 'map'})
        let tileset = this.map.addTilesetImage('tiles', 'tiles')
        let city_tiles = this.map.addTilesetImage('galletcity_tiles', 'gallet_city')
        this.baseLayer = this.map.createStaticLayer('base', [tileset, city_tiles])
        let paths = this.map.createStaticLayer('paths', tileset)
        let zones = this.map.createFromObjects('buildable_zone', 'buildable', {})
        let plots = []
        this.plotSprites = zones.map(s=>{
            let zone = this.add.tileSprite(s.x, s.y+s.displayHeight, s.displayWidth, s.displayHeight, 'tiles_sprites', SpriteIndexes.plot).setInteractive()
            let plot = {
                id: v4(),
                building: null,
                x: zone.x,
                y: zone.y,
                width: zone.displayWidth,
                height: zone.displayHeight,
                size: +findValue(s.data,'size')
            }
            plots.push(plot)
            zone.name = plot.id
            s.destroy()
            return zone
        })
        this.meatTruck = new MeatTruck(this, -100,300,'meat_truck', this.map.heightInPixels-25, this.map.widthInPixels/2)
        this.animalTruck = new AnimalTruck(this, -100,300,'animal_truck', this.map.heightInPixels-20, this.map.widthInPixels/3)
        this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            repeat: -1
        })

        this.cameras.main.setZoom(2)
        this.cameras.main.centerOn(this.map.widthInPixels/2, this.map.heightInPixels/2)
        
        this.input.on('pointerover', (event, gameObjects) => {
            if(!store.getState().modal && !this.placingAnimal && !this.placingBuilding){
                this.setSelectedPlot(gameObjects[0])
            }
        })
        this.input.on('pointermove', (event, gameObjects) => {
            if(this.placingBuilding){
                this.placingBuilding.setPosition(this.input.activePointer.worldX, this.input.activePointer.worldY)
                let valid = this.checkBuildingIntersection(this.placingBuilding)
                if(valid) this.placingBuilding.setTint(0x00ff00)
                else this.placingBuilding.setTint(0xff0000)
            }
            if(this.placingAnimal){
                this.placingAnimal.setPosition(this.input.activePointer.worldX, this.input.activePointer.worldY)
                let valid = this.checkAnimalIntersection(this.placingAnimal)
                if(valid){
                    this.targetBuilding = valid
                    this.placingAnimal.setTint(0x00ff00)
                } 
                else this.placingAnimal.setTint(0xff0000)
            }
        })
        this.input.on('pointerdown', (event, gameObjects) => {
            if(!store.getState().modal && gameObjects[0]){
                if(this.placingBuilding && this.placingBuilding.tintTopLeft === 0x00ff00){
                    this.placingBuilding.clearTint()
                    this.placingBuilding.clearAlpha()
                    onPlacedBuilding(this.tempBuilding)
                    return
                }
                if(this.placingAnimal && this.placingAnimal.tintTopLeft === 0x00ff00){
                    this.placingAnimal.clearTint()
                    this.placingAnimal.clearAlpha()
                    onPlacedAnimal(this.placingAnimalType, this.targetBuilding.id)
                    return
                }
                if(gameObjects[0].name){
                    onShowModal(Modal.BUY)
                    return
                }
                else if(gameObjects[0].id && !this.placingBuilding){
                    let building = store.getState().buildings.find(b=>b.id === gameObjects[0].id)
                    onShowSell(building)
                    return
                }
            }
        })
        this.input.keyboard.on('keydown-SHIFT', (event) => {
            if(this.placingBuilding){
                this.placingBuilding.setAngle(this.placingBuilding.angle === 0 ? 90 : 0)
            }
        })
        this.input.keyboard.on('keydown-ESC', (event) => {
            if(this.placingBuilding){
                this.placingBuilding.destroy()
                this.placingBuilding = null    
            }
            if(this.placingAnimal){
                this.placingAnimal.destroy()
                this.placingAnimal = null
            }
        })
        
        this.input.mouse.disableContextMenu()
    }

    startPlacingBuilding = (building:Building) => {
        this.placingBuilding = new BuildingSprite(this, this.map.widthInPixels/2, this.map.heightInPixels/2, building.type, building).setAlpha(0.5)
        this.tempBuilding = building
    }

    startPlacingAnimal = (type:AnimalType) => {
        this.placingAnimal = this.add.sprite(this.map.widthInPixels/2, this.map.heightInPixels/2, type).setAlpha(0.5).setScale(0.6)
        this.placingAnimalType = type
    }

    sellBuilding = (buildingId:string) => {
        //Run selling animation
        this.buildingSprites = this.buildingSprites.filter(bs=>{
            if(bs.id === buildingId){
                bs.destroy()
                return false
            } 
            return true
        })
    }

    setSelectedPlot = (sprite:GameObjects.TileSprite) => {
        this.setSelectIconPosition(sprite.getCenter())
        // let stationOffset = StationOffsets[station.name]
        // if(!this.avatar) this.avatar = this.add.sprite(station.getCenter().x+stationOffset.x, station.getCenter().y+stationOffset.y, 'avatar', Sprites['avatar'+station.name])
        // else{
        //     this.avatar.setFrame(Sprites['avatar'+station.name])
        //     this.avatar.setPosition(station.getCenter().x+stationOffset.x, station.getCenter().y+stationOffset.y)
        // } 
    }

    checkBuildingIntersection = (building:BuildingSprite) => {
        let brect = new Geom.Rectangle(building.getTopLeft().x, building.getTopLeft().y, building.displayWidth, building.displayHeight)
        if(building.angle === 90) {
            brect = new Geom.Rectangle(building.getBottomLeft().x, building.getBottomLeft().y, building.displayHeight, building.displayWidth)
        }
        return this.plotSprites.find(p=>
            Phaser.Geom.Rectangle.ContainsRect(
                new Geom.Rectangle(p.getTopLeft().x,p.getTopLeft().y,p.displayWidth, p.displayHeight), brect)
        )
    }

    checkAnimalIntersection = (animal:GameObjects.Sprite) => {
        let brect = new Geom.Rectangle(animal.getTopLeft().x, animal.getTopLeft().y, animal.displayWidth, animal.displayHeight)
        return this.buildingSprites.filter(bs=>{
            let b = store.getState().buildings.find(b=>b.id === bs.id)
            return hasCapacity(b)
        }).find(p=>{
            let prect = new Geom.Rectangle(p.getTopLeft().x+3,p.getTopLeft().y+3,p.displayWidth-3, p.displayHeight-3)
            if(p.angle === 90) {
                prect = new Geom.Rectangle(p.getBottomLeft().x+3, p.getBottomLeft().y+3, p.displayHeight-3, p.displayWidth-3)
            }
            return Phaser.Geom.Rectangle.ContainsRect(
                prect, brect)
        })
    }

    shakeIt = (station:GameObjects.Sprite) => {
        this.sounds.error.play()
        this.tweens.add({
            targets: station,
            x: {
                from: station.x+Phaser.Math.Between(-2,2),
                to: station.x
            },
            y: {
                from: station.y+Phaser.Math.Between(-2,2),
                to: station.y
            },
            repeat:2,
            duration: 40
        })
        this.showText(this.avatar.getBottomCenter().x, this.avatar.getBottomCenter().y+30, 'hey')
    }

    tick = () => {
        this.ticks++
        if(this.ticks % 10 === 0){
            onDayOver()
            if(store.getState().day % 4 === 0) this.meatTruck.enter()
            else this.meatTruck.exit()
            //run animal AI tick, eat, kill, or breed
            //run PETA check, if failed send in the cops
            //get the day's take
            //run employee mishap check
            
        } 
    }

    setSelectIconPosition(tuple:Tuple){
        if(!this.selectIcon){
            this.selectIcon = this.add.image(tuple.x, tuple.y, 'selected').setDepth(2).setScale(0.5)
            this.add.tween({
                targets: this.selectIcon,
                scale: 1,
                duration: 1000,
                repeat: -1,
                ease: 'Stepped',
                easeParams: [3],
                yoyo: true
            })
        }
        this.selectIcon.setPosition(tuple.x,tuple.y)
        this.sounds.step.play()
    }

    showText = (x:number, y:number, text:string, duration?:number) => {
        let font = this.add.text(x-30, y, text, {
            fontFamily: 'Arcology', 
            fontSize: '8px',
            color: 'white'
        })
        font.setStroke('#000000', 2);
        font.setWordWrapWidth(120)
        font.setDepth(4)
        this.add.tween({
            targets: font,
            ease: 'Stepped',
            easeParams:[4],
            duration: duration ? duration*1000 : 1500,
            y: y,
            onComplete: ()=>{
                font.destroy()
            }
        })
    }

    update(time:number, delta:number){
        
    }
}