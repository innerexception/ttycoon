import * as React from 'react'
import AppStyles from '../../AppStyles';
import Viewscreen from './Viewscreen'
import { TopBar, Button, LightButton, RangeInput, Icon, ProgressBar, NumericInput } from '../Shared'
import { Modal } from '../../enum';
import Lose from '../views/Lose';
import Win from '../views/Win';
import {onMuteAudio, onSummonAnimalTruck, onSetAdmission } from '../uiManager/Thunks'
import Buy from '../views/Buy';
import Sell from '../views/Sell';
import Animals from '../views/Animals'
import { Icons, Sprites } from '../../assets/Assets';
import Meat from '../views/Meat';

interface Props {
    modal:Modal
    day:number
    admission:number
    cash:number
    meat:number
    peta:number
}

export default class ViewscreenFrame extends React.Component<Props> {

    render(){
        return (
                <div style={{position:'relative', padding:'17px'}}>
                    <Viewscreen {...this.props} />
                    {this.props.modal === Modal.LOSE && <Lose/>}
                    {this.props.modal === Modal.WIN && <Win/>}
                    {this.props.modal === Modal.BUY && <Buy/>}
                    {this.props.modal === Modal.SELL && <Sell/>}
                    {this.props.modal === Modal.ANIMALS && <Animals/>}
                    {this.props.modal === Modal.MEAT && <Meat/>}
                    <div style={{position:'absolute', bottom:10,left:10}}>
                        <h6>Day {this.props.day}</h6>
                        <h6>Admission {Icon('CASH', '')}{NumericInput(this.props.admission, (val)=>onSetAdmission(val), 1000000, 0)}</h6>
                        <h6>Cash {Icon('CASH', '')}{this.props.cash}</h6>
                        <h6>Meat {Icon('MEAT', '')}{this.props.meat}</h6>
                        <h6>PETA Threats: {getPetaText(this.props.peta)}</h6>
                        <h6 style={{cursor:'pointer'}} onClick={onMuteAudio}>Mute</h6>
                        <div style={{backgroundImage: 'url('+Icons.animal_dealer+')', width:'24px', height:'24px', cursor:'pointer'}} onClick={onSummonAnimalTruck}/>
                    </div>
                </div>
        )
    }
}

const getPetaText = (val:number) => {
    if(val > 40) return 'Extreme'
    if(val > 30) return 'Very High'
    if(val > 20) return 'High'
    if(val > 10) return 'Moderate'
    return 'Low'

}