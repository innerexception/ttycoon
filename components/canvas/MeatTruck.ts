import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities, Modal } from "../../enum";
import { onShowModal } from "../uiManager/Thunks";
import ParkScene from "./ParkScene";
import Truck from "./Vehicle";


export default class MeatTruck extends Truck {
    onUpdateEnter = () => {
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
}
