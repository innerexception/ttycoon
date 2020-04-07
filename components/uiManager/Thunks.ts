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

export const onReplaceState = (state:RState) => {
    dispatch({
        type: UIReducerActions.REPLACE_STATE,
        state
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

export const onStartPlaceAnimal = (animalType:AnimalType) => {
    dispatch({
        type: UIReducerActions.PLACE_ANIMAL,
        animalType
    })
}

export const onSellBuilding = (buildingId:string) => {
    dispatch({
        type: UIReducerActions.SELL,
        buildingId
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

export const onPlacedBuilding = (building:Building) => {
    dispatch({
        type: UIReducerActions.BUY,
        building
    })
}

export const onInitGame = (game:Phaser.Game) => {
    dispatch({
        type: UIReducerActions.INIT_GAME,
        game
    })
}

export const onHire = (employee:Employee) => {
    dispatch({
        type: UIReducerActions.HIRE,
        employee
    })
}

export const onPlacedAnimal = (animalType:AnimalType, buildingId:string) => {
    dispatch({
        type: UIReducerActions.PLACED_ANIMAL,
        animalType,
        buildingId
    })
}

export const onStartPlaceBuilding = (building:Building) => {
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

export const onSummonLender = ()=> {
    dispatch({
        type: UIReducerActions.SUMMON_LENDER,
    })
}

export const onSetAdmission = (amount:number)=> {
    dispatch({
        type: UIReducerActions.SET_ADMISSION,
        amount
    })
}

export const onPay = (amount:number)=> {
    dispatch({
        type: UIReducerActions.PAY,
        amount
    })
}

export const onWin = () => {
    dispatch({
        type: UIReducerActions.WIN
    })
}

export const onHideModal = (modal?:Modal) => {
    dispatch({
        type: UIReducerActions.HIDE_MODAL,
        modal
    })
}

export const onBuyAd = (ad:AdType) => {
    dispatch({
        type: UIReducerActions.ADBUY,
        ad
    })
}

export const onBuyMeat = (amount:number) => {
    dispatch({
        type: UIReducerActions.BUY_MEAT,
        amount
    })
}

export const onInitSession = (difficulty:Difficulty) => {
    dispatch({ type: UIReducerActions.NEW_SESSION, difficulty })
}