import { GameObjects, Physics, Scene, Geom, Game } from "phaser"
import { Activities } from "../../enum";


export default class BuildingSprite extends GameObjects.Sprite {
    
    id:string
    plotId: string
    animalSprites: Array<GameObjects.Sprite>
   
    constructor(scene:Scene, x:number, y:number, texture:string, building:Building){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.id = building.id
        this.plotId = building.plotId
        this.setDepth(1)
    }

    addAnimal = (animal:AnimalType) => {

    }

    removeAnimal = (animal:AnimalType) => {

    }
}
