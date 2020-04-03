import * as v4 from 'uuid'
import { Difficulty, Activities, AnimalType, BuildingType } from '../enum';
import { SpriteIndexes } from '../assets/Assets';

export const getDays = (difficulty:Difficulty) => {
    switch(difficulty){
        case Difficulty.EASY: return 7
        case Difficulty.MEDIUM: return 21
        case Difficulty.HARD: return 60
    }
}

export const findValue = (data:Phaser.Data.DataManager, searchKey:string) => {
    let val
    Object.keys(data.values).forEach(key=>{if(data.values[key].name===searchKey) val = data.values[key].value })
    return val
}

export const hasCapacity = (building:Building, animal?:AnimalType) => {
    switch(building.type){
        case BuildingType.S_PEN: return building.animalCount < 3
        case BuildingType.M_PEN: return building.animalCount < 6
        case BuildingType.L_PEN: return building.animalCount < 9
        default: return false
    }
}