import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities } from "../../enum";


export default class BuildingSprite extends GameObjects.Sprite {
    
    id:string
    animalSprites: Array<GameObjects.Sprite>
   
    constructor(scene:Scene, x:number, y:number, texture:string, building:Building){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.id = building.id
        this.setDepth(1)
        this.setInteractive()
        this.animalSprites = []
    }

    addAnimal = (animal:AnimalType) => {
        this.animalSprites.push(this.scene.add.sprite(this.getCenter().x, this.getCenter().y, animal).setScale(0.5))
    }

    removeAnimal = (animal:AnimalType) => {

    }
}
