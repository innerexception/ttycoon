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

export const onUpdatePlots = (plots:Array<Plot>) => {
    dispatch({
        type: UIReducerActions.UPDATE_PLOTS,
        plots
    })
}

export const onShowSell = (plotId:string) => {
    dispatch({
        type: UIReducerActions.SHOW_SELL,
        sellingPlotId: plotId
    })
}

export const onShowBuy = (plotId:string) => {
    dispatch({
        type: UIReducerActions.SHOW_BUY,
        buyingPlotId: plotId
    })
}

export const onSellBuilding = () => {
    dispatch({
        type: UIReducerActions.SELL
    })
}

export const onTransactionComplete = () => {
    dispatch({
        type: UIReducerActions.TRANSACTION_COMPLETE
    })
}

export const onPlaceBuilding = (building:Building) => {
    dispatch({
        type: UIReducerActions.BUY,
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