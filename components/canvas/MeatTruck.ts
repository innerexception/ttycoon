import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities, Modal } from "../../enum";
import { onShowModal } from "../uiManager/Thunks";
import ParkScene from "./ParkScene";


export default class MeatTruck extends GameObjects.Sprite {
    
    yPos:number
    xPos:number
    marker: GameObjects.Sprite
    isParked:boolean
   
    constructor(scene:Scene, x:number, y:number, texture:string, yPos:number, xPos:number){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.setDepth(1)
        this.yPos = yPos
        this.xPos = xPos
        this.marker = this.scene.add.sprite(0,0,'marker').setDepth(2).setVisible(false).setScale(0.5)
    }

    enter = () => {
        this.setPosition(-100,this.yPos)
        this.scene.tweens.add({
            targets: this,
            x: this.xPos,
            duration: 4000,
            ease: Phaser.Math.Easing.Cubic.Out,
            onComplete: () => {
                this.setInteractive()
                this.on('pointerdown', (p)=>{
                    onShowModal(Modal.BUY)
                })
                this.isParked = true
                this.marker.setPosition(this.getTopCenter().x, this.getTopCenter().y-10)
                this.marker.setVisible(true)
                this.scene.tweens.add({
                    targets: this.marker,
                    y: this.getTopCenter().y-5,
                    yoyo:true,
                    repeat:-1
                })
            },
            onUpdate: () => {
                if(Phaser.Math.Between(0,30)===30){
                    let meat = this.scene.add.sprite(this.x, this.y, 'meat'+Phaser.Math.Between(1,5)).setScale(0.5)
                    this.scene.tweens.add({
                        targets: meat,
                        angle: Phaser.Math.Between(0,180),
                        x: meat.x-Phaser.Math.Between(10,20),
                        y: meat.y+Phaser.Math.Between(5,10),
                        duration: 500,
                        onComplete: ()=>{
                            this.scene.tweens.add({
                                targets: meat,
                                alpha:0,
                                duration: 1000,
                                delay: 5000,
                                onComplete: ()=>{
                                    meat.destroy()
                                }
                            })
                        }
                    })
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

    exit = () => {
        if(this.isParked){
            this.isParked = false
            this.disableInteractive()
            this.off('pointerdown')
            this.marker.setVisible(false)
            this.scene.tweens.add({
                targets: this,
                x: (this.scene as ParkScene).map.widthInPixels+100,
                duration: 5000,
                ease: Phaser.Math.Easing.Cubic.In,
                onUpdate: () => {
                    if(Phaser.Math.Between(0,30)===30){
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
}
