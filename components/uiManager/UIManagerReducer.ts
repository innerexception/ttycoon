import { UIReducerActions, Difficulty, Modal } from '../../enum'

const appReducer = (state = getInitialState(), action:any):RState => {
    switch (action.type) {
        case UIReducerActions.NEW_SESSION:
            return { ...state, engineEvent: null, difficulty: action.difficulty}
        case UIReducerActions.SHOW_MODAL: 
            return { ...state, modal: action.modal, engineEvent:null }
        case UIReducerActions.SHOW_BUY:
            return { ...state, modal: Modal.BUY, buyingPlotId: action.buyingPlotId, engineEvent: null}
        case UIReducerActions.SHOW_SELL:
            return { ...state, modal: Modal.SELL, sellingPlotId: action.sellingPlotId, engineEvent: null}
        case UIReducerActions.BUY:
            state.plots.forEach(p=>{
                if(p.id === state.buyingPlotId){
                    p.building = {...action.building, plotId: state.buyingPlotId }
                    state.cash -= p.building.price
                }
            })
            return { ...state, plots: Array.from(state.plots), modal: null, engineEvent: UIReducerActions.BUY}
        case UIReducerActions.SELL:
            state.plots.forEach(p=>{
                if(p.id === state.sellingPlotId){
                    p.building = null
                }
            })
            return { ...state, plots: Array.from(state.plots), modal: null, engineEvent: UIReducerActions.SELL}
        case UIReducerActions.UPDATE_PLOTS:
            return { ...state, plots: action.plots, engineEvent: null }
        case UIReducerActions.TRANSACTION_COMPLETE:
            return { ...state, engineEvent: null, buyingPlotId:'', sellingPlotId:'' }
        case UIReducerActions.HIDE_MODAL: 
            return { ...state, modal: null, engineEvent:null }
        case UIReducerActions.MUTE:
            return {...state, engineEvent:UIReducerActions.MUTE }
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
        plots: [],
        employees: 0,
        maxEmployees: 0,
        jobs: [],
        cash: 0,
        meat: 0,
        day: 0,
        status: null,
        buyingPlotId:'',
        sellingPlotId:''
    }
}