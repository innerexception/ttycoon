import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities } from "../../enum";
import { store } from "../../App";
import { getCapacityColor } from "../Util";
import { Sprites } from "../../assets/Assets";


export default class BuildingSprite extends GameObjects.Sprite {
    
    id:string
    animalSprite: GameObjects.Sprite
    countSprite: GameObjects.Text
    badge: GameObjects.Image
   
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
            this.animalSprite=this.scene.add.sprite(this.getCenter().x, this.getCenter().y, building.animal).setScale(0.5).setDepth(2)
            this.countSprite = this.scene.add.text(this.animalSprite.x-10, this.animalSprite.y, building.animalCount.toString()).setDepth(2)
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

    setInactive = () => {
        if(!this.badge) this.badge = this.scene.add.image(this.x, this.y, Sprites.no_employee).setDepth(3)
    }

    clearInactive = () => {
        if(this.badge){
            this.badge.destroy()
            this.badge = null
        }
    }
}
