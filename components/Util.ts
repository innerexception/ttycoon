import * as v4 from 'uuid'
import { Difficulty, Activities, AnimalType, BuildingType } from '../enum';
import { SpriteIndexes, EmployeeNames } from '../assets/Assets';

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
    if(building.animal && building.animal !== animal) return false
    switch(building.type){
        case BuildingType.S_PEN: return building.animalCount < 1
        case BuildingType.M_PEN: return building.animalCount < 3
        case BuildingType.L_PEN: return building.animalCount < 6
        default: return false
    }
}

export const getRandomInmates = () => {
    return new Array(3).fill({}).map(e=>{
        return {
            id:v4(),
            name: EmployeeNames[Phaser.Math.Between(0,EmployeeNames.length-1)],
            riskLevel: Phaser.Math.Between(0,10),
            price: Phaser.Math.Between(5, 25)
        }
    }) as Array<Employee>
}
