import { Scene, GameObjects, Tilemaps, Geom, Game, Display } from "phaser";
import { store } from "../../App";
import { defaults, SpriteIndexes, Buildings } from '../../assets/Assets'
import { Modal, UIReducerActions, StaticLayers, Activities, StationOffsets, RandomEvents, Chatter } from "../../enum";
import TimerSprite from "./BuildingSprite";
import * as v4 from 'uuid'
import { onUpdatePlots, onShowBuy, onShowSell, onTransactionComplete } from "../uiManager/Thunks";
import { findValue } from "../Util";
import BuildingSprite from "./BuildingSprite";


export default class ParkScene extends Scene {

    unsubscribeRedux: Function
    selectIcon: GameObjects.Image
    selectedPlot: number
    sounds: any
    plotSprites: Array<GameObjects.TileSprite>
    buildingSprites: Array<BuildingSprite>
    map:Tilemaps.Tilemap
    focusedItem: GameObjects.Sprite
    avatar:GameObjects.Sprite

    constructor(config){
        super(config)
        this.unsubscribeRedux = store.subscribe(this.onReduxUpdate)
        this.plotSprites = []
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
                case UIReducerActions.SELL:
                    //Run selling animation
                    this.buildingSprites = this.buildingSprites.filter(bs=>{
                        if(bs.plotId === uiState.sellingPlotId){
                            bs.destroy()
                            return false
                        } 
                        return true
                    })
                    onTransactionComplete()
                    break
                case UIReducerActions.BUY: 
                    //Run buy animation
                    let plotSpr = this.plotSprites.find(s=>s.name === uiState.buyingPlotId)
                    let plot = uiState.plots.find(p=>p.id === uiState.buyingPlotId)
                    this.buildingSprites.push(new BuildingSprite(this, plotSpr.x, plotSpr.y, plot.building.type, plot.building))
                    onTransactionComplete()
                    break
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
        this.map.createStaticLayer('base', tileset)
        let paths = this.map.createStaticLayer('paths', [tileset, city_tiles])
        let zones = this.map.createFromObjects('buildable_zone', 'buildable', {})
        let plots = []
        this.plotSprites = zones.map(s=>{
            let zone = this.add.tileSprite(s.x, s.y+s.displayHeight, s.displayWidth, s.displayHeight, 'tiles_sprites', SpriteIndexes.overlay)
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
        onUpdatePlots(plots)

        this.selectedPlot = 0
        this.setSelectedPlot(0)

        this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            repeat: -1
        })

        this.cameras.main.setZoom(2)
        this.cameras.main.centerOn(this.map.widthInPixels/2, this.map.heightInPixels/2)
        
        this.input.keyboard.on('keydown-LEFT', (event) => {
            if(!store.getState().modal) this.setSelectedPlot(-1)
        })
        this.input.keyboard.on('keydown-RIGHT', (event) => {
            if(!store.getState().modal) this.setSelectedPlot(1)
        })
        this.input.keyboard.on('keydown-SPACE', (event) => {
            if(!store.getState().modal){
                let plotId = this.plotSprites[this.selectedPlot].name
                let plot = store.getState().plots.find(p=>p.id === plotId)
                if(plot.building) onShowSell(plot.id)
                else onShowBuy(plot.id)
            }
        })
        this.input.mouse.disableContextMenu()
    }

    setSelectedPlot = (index:number) => {
        if(index > 0){
            this.selectedPlot = (this.selectedPlot+index)%this.plotSprites.length
        }
        else {
            this.selectedPlot = this.selectedPlot - 1
            if(this.selectedPlot < 0) this.selectedPlot = this.plotSprites.length-1
        }
        let station = this.plotSprites[this.selectedPlot]
        this.setSelectIconPosition(station.getCenter())
        // let stationOffset = StationOffsets[station.name]
        // if(!this.avatar) this.avatar = this.add.sprite(station.getCenter().x+stationOffset.x, station.getCenter().y+stationOffset.y, 'avatar', Sprites['avatar'+station.name])
        // else{
        //     this.avatar.setFrame(Sprites['avatar'+station.name])
        //     this.avatar.setPosition(station.getCenter().x+stationOffset.x, station.getCenter().y+stationOffset.y)
        // } 
    }

    tryUseSelectedStation = () => {
        
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

    setSanity = (val:number) => {
        // val = Math.min(MAX_SANITY_PIXELS, val)
        // if(val > this.sanity){
        //     this.tweens.add({
        //         targets: this.bar,
        //         tilePositionX: this.bar.tilePositionX-5,
        //         duration: 500
        //     })
        // }
        // let diff = this.sanity - val
        // this.bar.width = Math.max(1,val)
        // this.bar.setPosition(this.bar.x-(diff/2), this.bar.y)
        // this.sanity = val
    }

    tick = () => {
        
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
}