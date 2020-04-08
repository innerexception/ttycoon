import * as React from 'react'
import AppStyles from '../../AppStyles';
import Canvas from './Canvas'
import { TopBar, Button, LightButton, RangeInput, Icon, ProgressBar, NumericInput } from '../Shared'
import { Modal, StatusDescription, STATUS_DURATION, AnimalType, BuildingType } from '../../enum';
import Lose from '../views/Lose';
import Win from '../views/Win';
import {onMuteAudio, onSummonAnimalTruck, onSetAdmission, onShowModal, onSummonLender } from '../uiManager/Thunks'
import Buy from '../views/Buy';
import Sell from '../views/Sell';
import Animals from '../views/Animals'
import { Icons, Sprites } from '../../assets/Assets';
import Meat from '../views/Meat';
import Advertising from '../views/Advertising';
import Hiring from '../views/Hiring';
import { store } from '../../App';
import LoanShark from '../views/LoanShark';
import { getPublicInterest } from '../Util';

export default class CanvasFrame extends React.Component {

    render(){
        let state = store.getState()
        return (
                <div style={{position:'relative', padding:'17px'}}>
                    <Canvas />
                    {state.modal === Modal.LOSE && <Lose/>}
                    {state.modal === Modal.WIN && <Win/>}
                    {state.modal === Modal.BUY && <Buy/>}
                    {state.modal === Modal.SELL && <Sell/>}
                    {state.modal === Modal.ANIMALS && <Animals/>}
                    {state.modal === Modal.MEAT && <Meat/>}
                    {state.modal === Modal.ADS && <Advertising/>}
                    {state.modal === Modal.PRISON && <Hiring/>}
                    {state.modal === Modal.PAY && <LoanShark/>}
                    <div style={{position:'absolute', top:70, right:10, display:'flex'}}>
                        {Object.keys(state.status).map(key=>
                            <div style={{marginRight:'10px', display: state.status[key] ? 'block' : 'none'}}>
                                {Icon(key, StatusDescription[key], true)}
                                {state.status[key] && state.status[key].startDay && <div style={{height:'5px'}}>{ProgressBar(getStatusPercent(state.day, state.status[key]), 1)}</div>}
                            </div>)}
                    </div>
                    <div style={{position:'absolute', top:40}}>
                        <h4 style={{marginBottom:'5px'}}>Goal</h4>
                        <h6 style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'10px'}}>{Icon('CASH', 'Net worth')}</span> {state.cash-state.loan} / 100000</h6>
                        <h6 style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'10px'}}>{Icon('TIGER', 'Tigers')}</span> {getTigerCount(state.buildings)} / 50</h6>
                    </div>
                    <div style={{position:'absolute', bottom:10,left:10, display:"flex", alignItems:'flex-start', justifyContent:'space-between', width:'100%'}}>
                        <div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <h5>{Icon('phone', 'Contacts', true)}</h5>
                                <h5>:</h5>
                                <div onClick={onSummonLender}>{Icon('shady_lender', "Howard Steinberg (Loans)", true)}</div>
                                <div onClick={()=>onShowModal(Modal.BUY)}>{Icon('builder', "Scooter's Boys (Construction)", true)}</div>
                                <div onClick={onSummonAnimalTruck}>{Icon('animal_dealer', "Bob's Exotics (Animals)", true)}</div>
                                <div onClick={()=>onShowModal(Modal.PRISON)}>{Icon('warden', "Warden James (Hiring)", true)}</div>
                                <div onClick={()=>onShowModal(Modal.ADS)}>{Icon('ad_man', "Jimmy Goodman (Advertising)", true)}</div>
                            </div>
                            <div>
                                <h6>Day {state.day}</h6>
                                <h6 style={{display:'flex', alignItems:'center'}}>Admission {Icon('CASH', '')}{NumericInput(state.admission, (val)=>onSetAdmission(val), 1000000, 0)}</h6>
                            </div>
                        </div>
                        <div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('audio','Publicity', true)}<h6>: {getPublicText(getPublicInterest(state))}</h6>
                            </div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('cops', 'Chance of police', true)}<h6>: {getPetaText(state.peta)}</h6>
                            </div>
                        </div>
                        <div>
                            <h6>Staff: {state.employees.length} / req {state.buildings.filter(b=>b.type !==BuildingType.HOUSING).length} / housing {state.maxEmployees}</h6>
                            <h6 style={{display:'flex', alignItems:'center'}}>{Icon('MEAT', 'Meat')} {state.meat}</h6>
                            <h6 style={{display:'flex', alignItems:'center'}}>{Icon('CASH', 'Cash on hand')} {state.cash}</h6>
                        </div>
                    </div>
                </div>
        )
    }
}

const getStatusPercent = (day:number, status) => {
    if(status){
        if(status.startDay) return 1-((day - status.startDay) / STATUS_DURATION)
        else return 1
    } 
    return 0
}

const getPetaText = (val:number) => {
    if(val > 40) return 'Extreme'
    if(val > 30) return 'Very High'
    if(val > 20) return 'High'
    if(val > 10) return 'Moderate'
    return 'Low'

}

const getPublicText = (val:number) => {
    if(val > 22) return 'None'
    if(val > 15) return 'Some'
    if(val > 10) return 'Lots'
    if(val > 5) return 'Insanity'
    return 'Bedlam'
}

const getTigerCount = (buildings:Array<Building>) => buildings.filter(b=>b.animal===AnimalType.TIGER).map(b=>b.animalCount).reduce((sum, next)=>sum+next, 0)
