import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities } from "../../enum";


export default class BuildingSprite extends GameObjects.Sprite {
    
    id:string
    animalSprite: GameObjects.Sprite
    count:number
    countSprite: GameObjects.Text
   
    constructor(scene:Scene, x:number, y:number, texture:string, building:Building){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.id = building.id
        this.setDepth(1)
        this.setInteractive()
        this.count = 0
    }

    addAnimal = (animal:AnimalType) => {
        this.count++
        if(this.animalSprite){
            this.countSprite.setText(this.count.toString())
        } 
        else{
            this.animalSprite=this.scene.add.sprite(this.getCenter().x, this.getCenter().y, animal).setScale(0.5)
            this.countSprite = this.scene.add.text(this.animalSprite.x-10, this.animalSprite.y, this.count.toString())
        }
    }

    removeAnimal = () => {
        this.count--
        if(this.count > 0) this.countSprite.setText(this.count.toString())
        else {
            this.count = 0
            this.animalSprite.destroy()
            this.countSprite.destroy()
        }
    }
}
