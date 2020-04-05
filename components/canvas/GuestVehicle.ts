import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import Vehicle from "./Vehicle";
import ParkScene from "./ParkScene";
import GuestSprite from "./GuestSprite";
import { Sprites } from "../../assets/Assets";

export default class GuestVehicle extends Vehicle {
   
    scene: ParkScene

    constructor(scene:Scene, x:number, y:number, texture:string, yPos:number, xPos:number){
        super(scene, x, y, texture, yPos, xPos)
        scene.time.addEvent({
            delay: 20000,
            callback: ()=> {
                this.exit()
            }
        })
        this.scene = scene as ParkScene
        this.setDisplaySize(45, 25)
        this.enter()
    }

    onCompleteEnter = () => {
        let activeTiles = []
        this.isParked = true
        this.scene.pathsLayer.forEachTile(t=>{
            if(t.index !== -1){
                activeTiles.push(t)
            }
        })
        let spawn = activeTiles[Phaser.Math.Between(0,activeTiles.length-1)]
        new GuestSprite(this.scene, spawn.pixelX, spawn.pixelY, Sprites.Persons[Phaser.Math.Between(0,Sprites.Persons.length-1)], this.scene.baseLayer)
    }
}
