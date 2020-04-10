import * as React from 'react'
import AppStyles, { colors } from '../../AppStyles';
import Canvas from './Canvas'
import { TopBar, Button, LightButton, RangeInput, Icon, ProgressBar, NumericInput } from '../Shared'
import { Modal, StatusDescription, STATUS_DURATION, AnimalType, BuildingType } from '../../enum';
import Lose from '../views/Lose';
import Win from '../views/Win';
import {onMuteAudio, onSummonAnimalTruck, onSetAdmission, onShowModal, onSummonLender, onTakeMeth } from '../uiManager/Thunks'
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
import Tutorial from '../views/Tutorial';

interface Props {
    cash:number
    loan:number
}

export default class CanvasFrame extends React.Component<Props> {

    render(){
        let state = store.getState()
        return (
                <div style={{padding:'17px'}}>
                    <Canvas />
                    {state.modal === Modal.LOSE && <Lose/>}
                    {state.modal === Modal.WIN && <Win/>}
                    {state.modal === Modal.BUY && <Buy/>}
                    {state.modal === Modal.SELL && <Sell/>}
                    {state.modal === Modal.ANIMALS && <Animals/>}
                    {state.modal === Modal.MEAT && <Meat cash={this.props.cash}/>}
                    {state.modal === Modal.ADS && <Advertising/>}
                    {state.modal === Modal.PRISON && <Hiring/>}
                    {state.modal === Modal.PAY && <LoanShark cash={this.props.cash} loan={this.props.loan}/>}
                    {state.modal === Modal.TUTORIAL && <Tutorial/>}
                    <div style={{position:'absolute', top:'10px', right:'10px', display:'flex'}}>
                        {Object.keys(state.status).map(key=>
                            <div style={{marginRight:'10px', display: state.status[key] ? 'block' : 'none'}}>
                                {Icon(key, StatusDescription[key], true)}
                                {state.status[key] && state.status[key].startDay && <div style={{height:'5px'}}>{ProgressBar(getStatusPercent(state.day, state.status[key]), 1, colors.orange)}</div>}
                            </div>)}
                    </div>
                    <div style={{position:'absolute', bottom:0, right:0, zIndex:5}}>
                        <div onClick={onMuteAudio}>{Icon('sound', "Toggle Sound", true)}</div>
                    </div>
                    <div style={{position:'absolute', top:'10px', left:'30px'}}>
                        <h4 style={{marginBottom:'5px'}}>Goals, Day {state.day}</h4>
                        <h6 style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'10px'}}>{Icon('CASH', 'Net worth, cash minus loans')}</span> {state.cash-state.loan} / 100000</h6>
                        <h6 style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'10px'}}>{Icon('TIGER', 'Tigers')}</span> {getTigerCount(state.buildings)} / 50</h6>
                    </div>
                    <div style={{position:'absolute', bottom:0,left:'30px', display:"flex", alignItems:'flex-start', width:'100%'}}>
                        <div style={{marginRight:'25px'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <h5>{Icon('phone', 'Contacts', true)}</h5>
                                <h5>:</h5>
                                <div onClick={()=>onShowModal(Modal.BUY)}>{Icon('builder', "Scooter's Boys (Construction)", true)}</div>
                                <div onClick={onSummonAnimalTruck}>{Icon('animal_dealer', "Bob's Exotics (Animals)", true)}</div>
                                <div onClick={()=>onShowModal(Modal.PRISON)}>{Icon('warden', "Warden James (Hiring)", true)}</div>
                                <div onClick={()=>onShowModal(Modal.ADS)}>{Icon('ad_man', "Jimmy Goodman (Advertising)", true)}</div>
                                <div onClick={onSummonLender}>{Icon('shady_lender', "Howard Steinberg (Loans)", true)}</div>
                            </div>
                            <div>
                                <h6 style={{display:'flex', alignItems:'center'}}>Admission {NumericInput(state.admission, (val)=>onSetAdmission(val), 1000000, 0)}</h6>
                            </div>
                        </div>
                        <div style={{marginRight:'25px'}}>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('audio','', true)}<div style={{height:'10px', width: '50px', marginLeft:'10px'}}>{ProgressBar(Math.max(0, 30-getPublicInterest(state)), 30, colors.lGreen, 'Demand. Determines how many people tour the park. Jimmy Goodman can help with this. Ticket prices and having many different types of animals affect this too. Also stay out of trouble...')}</div>
                            </div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('cops', '', true)} <div style={{height:'10px', width: '50px', marginLeft:'10px'}}>{ProgressBar(state.peta, 50, colors.red, 'Chance of police activity')}</div>
                            </div>
                        </div>
                        <div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('MEAT','Meat. All your animals need it. Buy it from the meat truck that comes every 3 days!', true)}<h6>: {state.meat}</h6>
                            </div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Icon('CASH', 'Cash on hand', true)}<h6>: {state.cash}</h6>
                            </div>
                        </div>
                        <div>
                            <div style={{display:'flex', alignItems:"center"}}>
                                {Button(true, onTakeMeth, Icon('meth', '', true), "When it's meth time, all employees can run 2 buildings!")}<h6>: $1000</h6>
                            </div>
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
    if(val > 25) return 'None'
    if(val > 15) return 'Some'
    if(val > 10) return 'Lots'
    if(val > 5) return 'Crowds'
    return 'Bedlam'
}

export const getTigerCount = (buildings:Array<Building>) => buildings.filter(b=>b.animal===AnimalType.TIGER).map(b=>b.animalCount).reduce((sum, next)=>sum+next, 0)
