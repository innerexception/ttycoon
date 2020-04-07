import { UIReducerActions, Difficulty, Modal, Animals, AdType } from '../../enum'
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
                    b.animal = action.animalType
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
            let modal = state.modal
            if(action.modal && state.modal === action.modal) modal = null
            else if(!action.modal) modal = null
            return { ...state, modal, engineEvent:null }
        case UIReducerActions.MUTE:
            return { ...state, engineEvent:UIReducerActions.MUTE }
        case UIReducerActions.PLACE_BUILDING:
            (state.game.scene.getScene('map') as ParkScene).startPlacingBuilding({...action.building})
            return { ...state, modal:null }
        case UIReducerActions.PLACE_ANIMAL:
            (state.game.scene.getScene('map') as ParkScene).startPlacingAnimal(action.animalType)
            return { ...state, modal:null }
        case UIReducerActions.HIRE:
            state.employees.push(action.employee)
            return { ...state, employees: Array.from(state.employees), engineEvent:null, modal:null }
        case UIReducerActions.RESET:
            return getInitialState()
        case UIReducerActions.BUY_MEAT:
            (state.game.scene.getScene('map') as ParkScene).boughtMeat(action.amount)
            return { ...state, meat: state.meat + action.amount, cash: state.cash - (action.amount*5), engineEvent:null}
        case UIReducerActions.SUMMON_ANIMAL_TRUCK:
            return { ...state, engineEvent: UIReducerActions.SUMMON_ANIMAL_TRUCK }
        case UIReducerActions.SUMMON_LENDER:
            return { ...state, engineEvent: UIReducerActions.SUMMON_LENDER }
        case UIReducerActions.DISMISS_ANIMAL_TRUCK:
            return { ...state, engineEvent: UIReducerActions.DISMISS_ANIMAL_TRUCK, modal:null }
        case UIReducerActions.INIT_GAME:
            return { ...state, game: action.game }
        case UIReducerActions.SET_ADMISSION:
            return { ...state, admission: action.amount, engineEvent: null}
        case UIReducerActions.REPLACE_STATE:
            return { ...action.state, engineEvent:null }
        case UIReducerActions.ADBUY:
            return { ...state, status: {...state.status, [action.ad.type]: { startDay: state.day }}, cash: state.cash - action.ad.price, engineEvent:null, modal:null}
        case UIReducerActions.PAY:
            return { ...state, loan: state.loan -= action.amount, cash: state.cash -= action.amount, engineEvent:null }
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
        employees: [],
        maxEmployees: 0,
        jobs: [],
        cash: 20000,
        loan: 20000,
        meat: 0,
        peta: 0,
        day: 1,
        status: {
            [AdType.TV]:null,
            [AdType.RADIO]:null,
            [AdType.INTERNET]:null,
            [AdType.BILLBOARD]:null,
            publicAccident: null,
            employeeAccident: null,
            celebrityEndorsement: null,
            lowEmployment: null,
            meth: null
        },
        sellingBuilding: null,
        admission: 0,
        peopleToday: 0
    }
}