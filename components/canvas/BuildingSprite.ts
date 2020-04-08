import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities } from "../../enum";
import { store } from "../../App";
import { getCapacityColor } from "../Util";


export default class BuildingSprite extends GameObjects.Sprite {
    
    id:string
    animalSprite: GameObjects.Sprite
    countSprite: GameObjects.Text
   
    constructor(scene:Scene, x:number, y:number, texture:string, building:Building){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.id = building.id
        this.setDepth(1)
        this.setInteractive()
    }

    addAnimal = (building:Building) => {
        if(this.animalSprite){
            this.countSprite.setText(building.animalCount.toString())
            this.countSprite.setTint(getCapacityColor(building))
        } 
        else{
            this.animalSprite=this.scene.add.sprite(this.getCenter().x, this.getCenter().y, building.animal).setScale(0.5)
            this.countSprite = this.scene.add.text(this.animalSprite.x-10, this.animalSprite.y, building.animalCount.toString())
        }
    }

    removeAnimal = (building:Building) => {
        if(building.animalCount > 0){
            this.countSprite.setText(building.animalCount.toString())
            this.countSprite.setTint(getCapacityColor(building))
        } 
        else {
            this.animalSprite.destroy()
            this.animalSprite = null
            this.countSprite.destroy()
            this.countSprite = null
        }
    }
}
