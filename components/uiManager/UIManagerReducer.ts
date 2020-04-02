import { UIReducerActions, Difficulty, Modal } from '../../enum'
import * as v4 from 'uuid'

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
            state.buildings.push({...state.placingBuilding})
            state.cash-=state.placingBuilding.price
            return { ...state, buildings: Array.from(state.buildings), modal: null, engineEvent: UIReducerActions.BUY}
        case UIReducerActions.SELL:
            state.buildings.filter(p=>p.id !== state.sellingBuilding.id)
            return { ...state, buildings: Array.from(state.buildings), modal: null, engineEvent: UIReducerActions.SELL}
        case UIReducerActions.UPDATE_PLOTS:
            return { ...state, buildings: action.plots, engineEvent: null }
        case UIReducerActions.TRANSACTION_COMPLETE:
            return { ...state, engineEvent: null, placingBuilding: null, sellingBuilding: null }
        case UIReducerActions.HIDE_MODAL: 
            return { ...state, modal: null, engineEvent:null }
        case UIReducerActions.MUTE:
            return { ...state, engineEvent:UIReducerActions.MUTE }
        case UIReducerActions.PLACE_BUILDING:
            return { ...state, engineEvent:UIReducerActions.PLACE_BUILDING, placingBuilding: {...action.building, id:v4()}, modal:null }
        case UIReducerActions.RESET:
            return getInitialState()
        default:
            return state
    }
};

export default appReducer;

const getInitialState = ():RState => {
    return {
        engineEvent: null,
        modal: null,
        difficulty: null,
        buildings: [],
        employees: 0,
        maxEmployees: 0,
        jobs: [],
        cash: 0,
        meat: 0,
        day: 0,
        status: null,
        placingBuilding: null,
        sellingBuilding: null
    }
}