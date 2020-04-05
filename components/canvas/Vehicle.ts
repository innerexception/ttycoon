import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities, Modal } from "../../enum";
import ParkScene from "./ParkScene";
import { onShowModal } from "../uiManager/Thunks";


export default class Vehicle extends GameObjects.Sprite {
    
    yPos:number
    xPos:number
    marker: GameObjects.Sprite
    isParked: boolean
   
    constructor(scene:Scene, x:number, y:number, texture:string, yPos:number, xPos:number){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.setDepth(1)
        this.setDisplaySize(48, 24)
        this.yPos = yPos
        this.xPos = xPos
        this.marker = this.scene.add.sprite(0,0,'marker').setDepth(2).setVisible(false).setScale(0.5)
    }

    enter = (modal?:Modal) => {
        this.setPosition(-100,this.yPos)
        this.scene.tweens.add({
            targets: this,
            x: this.xPos,
            duration: 4000,
            ease: Phaser.Math.Easing.Cubic.Out,
            onComplete: ()=>this.onCompleteEnter(modal),
            onUpdate: this.onUpdateEnter
        })
    }

    exit = () => {
        if(this.isParked){
            this.disableInteractive()
            this.marker.setVisible(false)
            this.off('pointerdown')
            this.isParked = false
            this.scene.tweens.add({
                targets: this,
                x: (this.scene as ParkScene).map.widthInPixels+100,
                duration: 5000,
                ease: Phaser.Math.Easing.Cubic.In,
                onUpdate: () => {
                    if(Phaser.Math.Between(0,50)===50){
                        this.scene.tweens.add({
                            targets: this,
                            y: {
                                to: this.y+2,
                                from: this.yPos
                            },
                            duration: 100,
                            yoyo:true
                        })
                    }
                }
            })
        }
    }

    onCompleteEnter = (modal:Modal) => {
        if(modal){
            this.setInteractive()
            this.on('pointerdown', (p)=>{
                onShowModal(modal)
            })
            this.marker.setPosition(this.getTopCenter().x, this.getTopCenter().y-10)
            this.marker.setVisible(true)
            this.scene.tweens.add({
                targets: this.marker,
                y: this.getTopCenter().y-5,
                yoyo:true,
                repeat:-1
            })
        }
        this.isParked = true
    }

    onUpdateEnter = () => {
        if(Phaser.Math.Between(0,50)===50){
            this.scene.tweens.add({
                targets: this,
                y: {
                    to: this.y+2,
                    from: this.yPos
                },
                duration: 100,
                yoyo:true
            })
        }
    }
}
