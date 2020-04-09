import { Scene, GameObjects, Tilemaps, Geom, Physics } from "phaser";
import { store } from "../../App";
import { defaults, SpriteIndexes, Sprites } from '../../assets/Assets'
import { Modal, UIReducerActions, BuildingType, Animals, STATUS_DURATION, FONT_DEFAULT } from "../../enum";
import * as v4 from 'uuid'
import { onShowSell, onReplaceState, onShowModal, onPlacedBuilding, onPlacedAnimal, onHideModal, onWin } from "../uiManager/Thunks";
import { findValue, hasCapacity, getPublicInterest } from "../Util";
import BuildingSprite from "./BuildingSprite";
import MeatTruck from "./MeatTruck";
import GuestSprite from "./GuestSprite";
import Vehicle from "./Vehicle";
import GuestVehicle from "./GuestVehicle";
import { getTigerCount } from "./CanvasFrame";
import { colors } from "../../AppStyles";


const CONTACT_VEHICLE_OFFSET = 50
const GUEST_VEHICLE_OFFSET = 25
const DAY_LENGTH = 15

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
    pathsLayer: Tilemaps.StaticTilemapLayer
    focusedItem: GameObjects.Sprite
    avatar:GameObjects.Sprite
    ticks:number
    meatTruck: MeatTruck
    animalTruck: Vehicle
    lenderCar: Vehicle
    swatVan: Vehicle
    talkingHead: GameObjects.Sprite
    emitter: GameObjects.Particles.ParticleEmitterManager
    meatEmitters: Array<GameObjects.Particles.ParticleEmitter>
    entranceBooth: GameObjects.Sprite
    instruction: GameObjects.Text

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
                    this.sounds.build.play()
                    break
                case UIReducerActions.PAY:
                    this.sounds.register.play()
                    break
                case UIReducerActions.PLACED_ANIMAL:
                    let b = uiState.buildings.find(b=>b.id === this.targetBuilding.id)
                    this.targetBuilding.addAnimal(b)
                    this.placingAnimal.destroy()
                    this.placingAnimal = null
                    break
                case UIReducerActions.SUMMON_ANIMAL_TRUCK:
                    if(!this.animalTruck.isParked){
                        this.showTalkingHead(Sprites.ANIMAL_DEALER, "I'll meet you, but I can't stay long...", 'white')
                        this.animalTruck.enter(Modal.ANIMALS)
                        this.time.addEvent({
                            delay: 25000,
                            callback: ()=>{
                                this.showTalkingHead(Sprites.ANIMAL_DEALER, 'Gotta go chief! Call me if you need more!', 'white')
                                this.animalTruck.exit()
                                onHideModal(Modal.ANIMALS)
                            }
                        })
                    }
                    break
                case UIReducerActions.DISMISS_ANIMAL_TRUCK:
                    this.showTalkingHead(Sprites.ANIMAL_DEALER, 'Later chief!', 'white')
                    this.animalTruck.exit()
                    break
                case UIReducerActions.SUMMON_LENDER:
                    this.showTalkingHead(Sprites.LOAN_SHARK, 'You got my money?', 'white')
                    this.lenderCar.enter(Modal.PAY)
                    this.sounds.fast.play()
                    this.time.addEvent({
                        delay: 15000,
                        callback: ()=>{
                            this.showTalkingHead(Sprites.LOAN_SHARK, "Don't waste my time.", 'white')
                            this.lenderCar.exit()
                            this.sounds.fast.play()
                            onHideModal(Modal.PAY)
                        }
                    })
                    break
                case UIReducerActions.METH:
                    this.cameras.main.shake(150, 0.01)
                    break
            }
    }

    create = () =>
    {
        this.sound.volume = 0.4
        this.sounds = {
            step: this.sound.add('step'),
            error: this.sound.add('error'),
            jalopy: this.sound.add('old'),
            fast: this.sound.add('fast'),
            meat: this.sound.add('meat'),
            roar: this.sound.add('roar'),
            build: this.sound.add('build'),
            sell: this.sound.add('destroyed'),
            cops: this.sound.add('cops'),
            register: this.sound.add('register'),
            mumbler: this.sound.add('mumbler')
        }
        this.sound.add('gameplay').play({loop:true, volume: 0.2})
        this.emitter = this.add.particles('meat').setDepth(3)
        this.meatEmitters = []
        for(var i=1; i<=5;i++){
            this.meatEmitters.push(this.emitter.createEmitter({
                frame: i,
                x: { min: -100, max: 100 },
                y: { min: -100, max: 100 },
                lifespan: 750,
                speed:200
            }).stop())
        }
        this.map = this.make.tilemap({ key: 'map'})
        let tileset = this.map.addTilesetImage('tiles', 'tiles')
        let city_tiles = this.map.addTilesetImage('galletcity_tiles', 'gallet_city')
        this.baseLayer = this.map.createStaticLayer('base', [tileset, city_tiles])
        this.pathsLayer = this.map.createStaticLayer('paths', tileset)
        let zones = this.map.createFromObjects('buildable_zone', 'buildable', {})
        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)
        this.physics.world.setBoundsCollision()
        this.baseLayer.setCollisionBetween(0,20000)
        this.physics.world.on('worldbounds', this.personHitBounds);
        this.entranceBooth = this.map.createFromObjects('buildable_zone', 'entrance', { key: 'booth'})[0]
        this.entranceBooth.setDepth(2)
        let plots = []
        this.plotSprites = zones.map(s=>{
            let zone = this.add.tileSprite(s.x, s.y+s.displayHeight, s.displayWidth, s.displayHeight, 'tiles_sprites', SpriteIndexes.plot)
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
        this.meatTruck = new MeatTruck(this, -100,300,'meat_truck', this.map.heightInPixels-CONTACT_VEHICLE_OFFSET, this.map.widthInPixels/2)
        this.animalTruck = new Vehicle(this, -100,300,'animal_truck', this.map.heightInPixels-CONTACT_VEHICLE_OFFSET, this.map.widthInPixels/3)
        this.swatVan = new Vehicle(this, -100,300,'swat_van', this.map.heightInPixels-CONTACT_VEHICLE_OFFSET, (this.map.widthInPixels/2)+50)
        this.lenderCar = new Vehicle(this, -100, 300, 'fast', this.map.heightInPixels-CONTACT_VEHICLE_OFFSET,this.map.widthInPixels-100)
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
                    this.instruction.destroy()
                    onPlacedBuilding(this.tempBuilding)
                    return
                }
                if(this.placingAnimal && this.placingAnimal.tintTopLeft === 0x00ff00){
                    this.placingAnimal.clearTint()
                    this.placingAnimal.clearAlpha()
                    this.instruction.destroy()
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
            this.instruction.destroy()
        })
        
        this.input.mouse.disableContextMenu()
    }

    startPlacingBuilding = (building:Building) => {
        this.placingBuilding = new BuildingSprite(this, this.map.widthInPixels/2, this.map.heightInPixels/2, building.type, building).setAlpha(0.5)
        this.tempBuilding = building
        this.instruction = this.add.text(10,10,'(Esc to cancel placing, shift to rotate)', FONT_DEFAULT)
    }

    startPlacingAnimal = (type:AnimalType) => {
        this.placingAnimal = this.add.sprite(this.map.widthInPixels/2, this.map.heightInPixels/2, type).setAlpha(0.5).setScale(0.6)
        this.placingAnimalType = type
        this.instruction = this.add.text(10,10,'(Esc to cancel placing)', FONT_DEFAULT)
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
        this.selectIcon.visible = false
        this.sounds.sell.play()
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

    personHitBounds = (body:Physics.Arcade.Body) => {
        (body.gameObject as GuestSprite).pickNewDirection()
    }

    checkBuildingIntersection = (building:BuildingSprite) => {
        let brect = new Geom.Rectangle(building.getTopLeft().x, building.getTopLeft().y, building.displayWidth, building.displayHeight)
        if(building.angle === 90) {
            brect = new Geom.Rectangle(building.getBottomLeft().x, building.getBottomLeft().y, building.displayHeight, building.displayWidth)
        }
        let plotFit = this.plotSprites.find(p=>
            Phaser.Geom.Rectangle.ContainsRect(
                new Geom.Rectangle(p.getTopLeft().x,p.getTopLeft().y,p.displayWidth, p.displayHeight), brect)
        )
        if(plotFit){
            let prect = new Geom.Rectangle(plotFit.getTopLeft().x, plotFit.getTopLeft().y, plotFit.displayWidth, plotFit.displayHeight)
            let existingBuilds = this.buildingSprites.filter(b=>Phaser.Geom.Rectangle.Contains(prect,b.getTopLeft().x,b.getTopLeft().y))
            return !existingBuilds.find(b=>{
                let erect = new Geom.Rectangle(b.getTopLeft().x, b.getTopLeft().y, b.displayWidth, b.displayHeight)
                if(b.angle === 90) {
                    erect = new Geom.Rectangle(b.getBottomLeft().x, b.getBottomLeft().y, b.displayHeight, b.displayWidth)
                }
                return Phaser.Geom.Rectangle.Overlaps(erect, brect)
            })
        }
    }

    checkAnimalIntersection = (animal:GameObjects.Sprite) => {
        let brect = new Geom.Rectangle(animal.getTopLeft().x, animal.getTopLeft().y, animal.displayWidth, animal.displayHeight)
        return this.buildingSprites.filter(bs=>{
            let b = store.getState().buildings.find(b=>b.id === bs.id)
            return hasCapacity(b, this.placingAnimalType)
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
        this.showText(this.avatar.getBottomCenter().x, this.avatar.getBottomCenter().y+30, 'hey', 'white')
    }

    tick = () => {
        this.ticks++
        let state = store.getState()

        let personChance = Math.round(getPublicInterest(state)/5)
        if(personChance < 5 && Phaser.Math.Between(0, personChance) === personChance){
            this.spawnPerson()
            state.peopleToday++
        }

        state.loan += Math.round(state.loan*0.0005)

        state.status.lowEmployment = false
        let available = state.employees.length
        if(state.status.meth) available=available*2 
        state.buildings.filter(b=>b.type !== BuildingType.HOUSING).forEach(b=>{
            if(available <= 0){
                b.isActive = false
                this.setBuildingInactive(b.id)
                state.status.lowEmployment = true
            } 
            else{
                b.isActive = true
                this.setBuildingActive(b.id)
            } 
            available--
        })

        if(this.ticks % DAY_LENGTH === 0){
            state.day++
            if(state.day % 3 === 0){
                this.showTalkingHead(Sprites.MEAT_MAN, 'Get yer meat here! Just slightly expired.', 'white')
                this.meatTruck.enter(Modal.MEAT)
            } 
            else{
                if(this.meatTruck.isParked){
                    this.meatTruck.exit()
                }
                onHideModal(Modal.MEAT)
            } 

            state.status.noMeat = false
            state.buildings.forEach(existingBuilding=>{
                if(existingBuilding.animalCount){
                    let anim=Animals.find(a=>a.assetName === existingBuilding.animal)
                    if(state.meat >= anim.meat){
                        state.meat-=anim.meat
                        if(state.meat < 10) state.status.noMeat = true
                        if(existingBuilding.animalCount >= 2 && Phaser.Math.Between(0,1)===0){
                            if(hasCapacity(existingBuilding, existingBuilding.animal)){
                                existingBuilding.animalCount++
                                let spr = this.buildingSprites.find(s=>s.id===existingBuilding.id)
                                spr.addAnimal(existingBuilding)
                                this.showText(spr.x, spr.y, 'A new '+existingBuilding.animal+' was born!', 'green')
                                return
                            }
                            else {
                                //see if there is another building with space
                                let cap = state.buildings.find(b=>hasCapacity(b, existingBuilding.animal))
                                if(cap){
                                    cap.animalCount++
                                    let spr = this.buildingSprites.find(s=>s.id===cap.id)
                                    cap.animal= existingBuilding.animal
                                    spr.addAnimal(cap)
                                    this.showText(spr.x, spr.y, 'A new '+existingBuilding.animal+' was born! But there was no space so we moved it here.', 'green')
                                    return
                                }
                                //otherwise it dies
                                this.showTalkingHead(Sprites.TUTORIAL, "A new "+existingBuilding.animal+" was born, but there wasn't space for it...make sure you have enough cages!", colors.orange)
                                state.meat++
                                state.peta++
                            }
                        } 
                    }
                    else {
                        state.status.noMeat = true
                        this.showTalkingHead(Sprites.TUTORIAL, "Animals are starving, make sure you have enough meat!", colors.orange)
                        let event = Phaser.Math.Between(0,3)
                        let spr = this.buildingSprites.find(spr=>spr.id===existingBuilding.id)
                        switch(event){
                            //dies
                            case 0: existingBuilding.animalCount--
                                    state.peta++
                                    state.meat++
                                    this.showText(spr.x, spr.y, 'A '+existingBuilding.animal+' starved.', 'red')
                                    if(existingBuilding.animalCount <= 0){
                                        existingBuilding.animal = null
                                        existingBuilding.animalCount = 0
                                        spr.removeAnimal(existingBuilding)
                                    }
                                    break
                            //eats employee
                            case 1: let dead = state.employees.splice(Phaser.Math.Between(0,state.employees.length-1), 1)[0]
                                    if(dead){
                                        this.showText(spr.x, spr.y, dead.name + ' was eaten.', 'red')
                                        state.status.employeeAccident = { startDay: state.day }
                                        this.sounds.roar.play()
                                    } 
                                    break
                        }
                    }
                }

                if(existingBuilding.isActive){
                    if(existingBuilding.type === BuildingType.GIFT_SHOP){
                        state.cash += state.peopleToday*5
                        this.floatText(this.entranceBooth.x, this.entranceBooth.y, 'Gift Shop +$'+(state.peopleToday*5), 'green')
                    }
                    if(existingBuilding.type === BuildingType.PETTING_ARENA){
                        state.cash += state.peopleToday*20
                        state.peta++
                        this.floatText(this.entranceBooth.x, this.entranceBooth.y+30, 'Petting Arena +$'+(state.peopleToday*20), 'green')
                    }
                    if(existingBuilding.type === BuildingType.SNACK_HUT && state.meat >= 10){
                        state.meat -= 10
                        state.cash += state.peopleToday*10 
                        this.floatText(this.entranceBooth.x, this.entranceBooth.y+60, 'Snack Hut +$'+(state.peopleToday*10), 'green')
                    }
                }
            })
            //run PETA check, if failed send in the cops
            if(state.peta > 3 && Phaser.Math.Between(state.peta, 25)===25){
                this.swatVan.enter()
                this.time.addEvent({
                    delay: 10000,
                    callback: ()=>{
                        this.swatVan.exit()
                    }
                })
                this.showTalkingHead(Sprites.COPS, "We've recieved a tip about animal abuse at this location. You've been fined $10,000.", colors.red)
                this.sounds.cops.play()
                this.showTalkingHead(Sprites.TUTORIAL, "Careful! If the cops show up more than 3 times, they'll put you in prison like me!", colors.orange)
                state.cash-=10000
                state.peta = 0
                state.violations++
            }
            //get the day's take
            let take = state.peopleToday * state.admission
            state.cash += take
            this.floatText(this.entranceBooth.x, this.entranceBooth.y, '+$'+take, 'green')
            if(state.employees.length > 0){
                let payroll = state.employees.map(e=>e.price).reduce((sum, next)=>sum+next)
                state.cash -= payroll
            }
            state.peopleToday = 0
            //clear old status
            Object.keys(state.status).forEach(key=>{
                let statusEffect = state.status[key]
                if(statusEffect && state.day - statusEffect.startDay > STATUS_DURATION){
                    state.status[key] = null
                }
            })

            //rampage
            if(state.status.meth){
                let rager
                state.employees.forEach(e=>{
                    if(Phaser.Math.Between(0,20-e.riskLevel)===0){
                        rager = e
                    }
                })
                if(rager){
                    this.swatVan.enter()
                    this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            this.swatVan.exit()
                        }
                    })
                    this.showTalkingHead(Sprites.COPS, 'Your employee, '+rager.name+', was shot by a berserk meth head.', colors.orange)
                    state.employees = state.employees.filter(e=>e.id !== rager.id)
                    this.sounds.cops.play()
                }
            }

            //arrest
            let arrest
            state.employees.forEach(e=>{
                if(Phaser.Math.Between(0,30-e.riskLevel)===0){
                    arrest = e
                }
            })
            if(arrest){
                this.swatVan.enter()
                this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        this.swatVan.exit()
                    }
                })
                this.showTalkingHead(Sprites.COPS, 'Your employee, '+arrest.name+', has been getting into trouble again.', colors.orange)
                state.employees = state.employees.filter(e=>e.id !== arrest.id)
                this.sounds.cops.play()
            }
            //marriage?
            //divorce?
        } 

        if(getTigerCount(state.buildings) >= 50 && state.cash - state.loan >= 100000) onShowModal(Modal.WIN)
        if(state.violations > 3){
            this.swatVan.enter()
            onShowModal(Modal.LOSE)
        } 

        onReplaceState(state)
    }

    setBuildingActive = (id:string) => {
        let spr = this.buildingSprites.find(s=>s.id===id)
        spr.clearInactive()
    }
    setBuildingInactive = (id:string) => {
        let spr = this.buildingSprites.find(s=>s.id===id)
        spr.setInactive()
    }

    spawnPerson = () => {
        new GuestVehicle(this,-100, 300, Sprites.PersonVehicles[Phaser.Math.Between(0,Sprites.PersonVehicles.length-1)], this.map.heightInPixels-GUEST_VEHICLE_OFFSET, Phaser.Math.Between(50, this.map.widthInPixels-50))
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
        this.selectIcon.setPosition(tuple.x,tuple.y).setVisible(true)
        this.sounds.step.play()
    }

    showTalkingHead = (texture:string, text:string, color:string) => {
        if(this.talkingHead) this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.showTalkingHead(texture, text, color)
            }
        })
        else {
            this.talkingHead = this.add.sprite(25, 25, texture).setScale(0.5)
            this.sounds.mumbler.play()
            this.showText(this.talkingHead.getTopRight().x+40, this.talkingHead.y, text, color, 4)
            this.time.addEvent({
                delay:5000,
                callback: ()=>{
                    this.talkingHead.destroy()
                    this.talkingHead = null
                }
            })
        }
    }

    showText = (x:number, y:number, text:string, color:string, duration?:number) => {
        let font = this.add.text(x-30, y, text,  {...FONT_DEFAULT, color})
        font.setStroke('#000000', 4);
        font.setWordWrapWidth(200)
        font.setDepth(4)
        this.add.tween({
            targets: font,
            ease: 'Stepped',
            easeParams:[4],
            duration: duration ? duration*1000 : 3000,
            y: y,
            onComplete: ()=>{
                font.destroy()
            }
        })
    }

    floatText = (x:number, y:number, text:string, color:string) => {
        let font = this.add.text(x-30, y, text, {...FONT_DEFAULT, color})
        font.setStroke('#000000', 4);
        font.setWordWrapWidth(200)
        font.setDepth(4)
        this.add.tween({
            targets: font,
            duration: 1500,
            y: y+30,
            alpha: 0,
            onComplete: ()=>{
                font.destroy()
            }
        })
    }

    boughtMeat = (amount:number) => {
        for(var i=0; i<amount;i++){
            this.meatEmitters[i%this.meatEmitters.length].explode(1, this.meatTruck.x, this.meatTruck.y)
        }
        this.sounds.meat.play()
    }

    update(time:number, delta:number){
        
    }
}