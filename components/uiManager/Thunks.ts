import { UIReducerActions, Modal, Difficulty } from '../../enum'
import { dispatch } from '../../App';

// export const onQuit = () => {
//     ipcRenderer.send('close')
//     dispatch({
//         type: UIReducerActions.QUIT
//     })
// }

export const onReset = () => {
    dispatch({
        type: UIReducerActions.RESET
    })
}

export const onShowModal = (modal:Modal) => {
    dispatch({
        type: UIReducerActions.SHOW_MODAL,
        modal
    })
}

export const onShowSell = (building:Building) => {
    dispatch({
        type: UIReducerActions.SHOW_SELL,
        sellingBuilding:building
    })
}

export const onDayOver = () => {
    dispatch({
        type: UIReducerActions.DAY_OVER
    })
}

export const onShowBuy = (plotId:string) => {
    dispatch({
        type: UIReducerActions.SHOW_BUY,
        buyingPlotId: plotId
    })
}

export const onStartPlaceAnimal = () => {
    // dispatch({
    //     type: UIReducerActions.SELL
    // })
}

export const onSellBuilding = () => {
    dispatch({
        type: UIReducerActions.SELL
    })
}

export const onDismissAnimalTruck = () => {
    dispatch({
        type: UIReducerActions.DISMISS_ANIMAL_TRUCK
    })
}

export const onTransactionComplete = () => {
    dispatch({
        type: UIReducerActions.TRANSACTION_COMPLETE
    })
}

export const onPlaceBuilding = () => {
    dispatch({
        type: UIReducerActions.BUY
    })
}

export const onStartPlaceBuilding = (building:BuildingConfig) => {
    dispatch({
        type: UIReducerActions.PLACE_BUILDING,
        building
    })
}

export const onLose = (text:string) => {
    dispatch({
        type: UIReducerActions.SHOW_MODAL,
        text,
        modal: Modal.LOSE
    })
}

export const onMuteAudio = ()=> {
    dispatch({
        type: UIReducerActions.MUTE,
    })
}

export const onSummonAnimalTruck = ()=> {
    dispatch({
        type: UIReducerActions.SUMMON_ANIMAL_TRUCK,
    })
}

export const onWin = () => {
    dispatch({
        type: UIReducerActions.WIN
    })
}

export const onHideModal = () => {
    dispatch({
        type: UIReducerActions.HIDE_MODAL,
    })
}

export const onInitSession = (difficulty:Difficulty) => {
    dispatch({ type: UIReducerActions.NEW_SESSION, difficulty })
}