import * as v4 from 'uuid'
import { Difficulty, Activities, AnimalType, BuildingType, Animals, EmployeeNames } from '../enum';
import { store } from '../App';

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

export const hasCapacity = (building:Building, animal:AnimalType) => {
    if(building.animal && building.animal !== animal) return false
    if(building.animal && building.animal === animal){
        return  building.animalCount < building.maxAnimals
    }
    return building.type === BuildingType.S_PEN || building.type === BuildingType.M_PEN || building.type === BuildingType.L_PEN
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

export const getPublicInterest = (state:RState) => {
    let personChance = 30
    personChance -= state.buildings.map(b=>{
        let anim = Animals.find(a=>a.assetName === b.animal)
        if(anim) return anim.interest * b.animalCount
        return 0
    }).reduce((sum, next)=>sum+next, 0)
    if(state.status.celebrityEndorsement) personChance -= 10
    if(state.status.employeeAccident) personChance += 20
    if(state.status.internet) personChance -= 5
    if(state.status.billboard) personChance -= 5
    if(state.status.radio) personChance -= 10
    if(state.status.tv) personChance -= 20
    if(state.buildings.find(b=>b.type === BuildingType.STUDIO && b.isActive)) personChance -= 5
    personChance += state.admission/5
    return Math.max(0,personChance)
}

export const getAnimalCount = (buildings:Array<Building>) => 
    buildings.filter(b=>b.animal).map(b=>b.animalCount).reduce((sum, next)=>sum+next, 0)


export const getCapacityColor = (building:Building)=>{
    let remaining = building.maxAnimals - building.animalCount
    if(remaining > 2) return 0x00ff00
    else return 0xffa500 
}

export const canAfford = (amount:number) => store.getState().cash >= amount
