import { UIReducerActions, Difficulty, Modal, Animals } from '../../enum'
import * as v4 from 'uuid'
import ParkScene from '../canvas/ParkScene';

const appReducer = (state = getInitialState(), action:any):RState => {
    switch (action.type) {
        case UIReducerActions.NEW_SESSION:
            return { ...state, engineEvent: null, difficulty: action.difficulty}
        case UIReducerActions.SHOW_MODAL: 
            return { ...state, modal: action.modal, engineEvent:null }
        case UIReducerActions.SHOW_BUY:
            return { ...state, modal: Modal.BUY, engineEvent: null}
        case UIReducerActions.SHOW_SELL:
            return { ...state, modal: Modal.SELL, sellingBuilding: action.sellingBuilding, engineEvent: null}
        case UIReducerActions.BUY:
            state.buildings.push(action.building)
            state.cash-=action.building.price
            return { ...state, buildings: Array.from(state.buildings), modal: null, engineEvent: UIReducerActions.BUY}
        case UIReducerActions.PLACED_ANIMAL:
            state.buildings.forEach(b=>{
                if(b.id === action.buildingId){
                    b.animalCount++
                }
            })
            state.cash -= Animals.find(a=>a.assetName===action.animalType).price
            return { ...state, buildings: Array.from(state.buildings), engineEvent: UIReducerActions.PLACED_ANIMAL }
        case UIReducerActions.SELL:
            state.buildings.filter(p=>p.id !== state.sellingBuilding.id);
            (state.game.scene.getScene('map') as ParkScene).sellBuilding(state.sellingBuilding.id)
            return { ...state, buildings: Array.from(state.buildings), modal: null, engineEvent: null}
        case UIReducerActions.UPDATE_PLOTS:
            return { ...state, buildings: action.plots, engineEvent: null }
        case UIReducerActions.HIDE_MODAL: 
            return { ...state, modal: null, engineEvent:null }
        case UIReducerActions.MUTE:
            return { ...state, engineEvent:UIReducerActions.MUTE }
        case UIReducerActions.PLACE_BUILDING:
            (state.game.scene.getScene('map') as ParkScene).startPlacingBuilding({...action.building, id:v4()})
            return { ...state, modal:null }
        case UIReducerActions.PLACE_ANIMAL:
            (state.game.scene.getScene('map') as ParkScene).startPlacingAnimal(action.animalType)
            return { ...state, modal:null }
        case UIReducerActions.DAY_OVER:
            return { ...state, day: state.day+1, engineEvent: null}
        case UIReducerActions.RESET:
            return getInitialState()
        case UIReducerActions.SUMMON_ANIMAL_TRUCK:
            return { ...state, engineEvent: UIReducerActions.SUMMON_ANIMAL_TRUCK }
        case UIReducerActions.DISMISS_ANIMAL_TRUCK:
            return { ...state, engineEvent: UIReducerActions.DISMISS_ANIMAL_TRUCK, modal:null }
        case UIReducerActions.INIT_GAME:
            return { ...state, game: action.game }
        default:
            return state
    }
};

export default appReducer;

const getInitialState = ():RState => {
    return {
        game: null,
        engineEvent: null,
        modal: null,
        difficulty: null,
        buildings: [],
        employees: 0,
        maxEmployees: 0,
        jobs: [],
        cash: 0,
        meat: 0,
        day: 1,
        status: null,
        sellingBuilding: null
    }
}