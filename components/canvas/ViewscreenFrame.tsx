import * as React from 'react'
import AppStyles from '../../AppStyles';
import Viewscreen from './Viewscreen'
import { TopBar, Button, LightButton, RangeInput, Icon, ProgressBar } from '../Shared'
import { Modal } from '../../enum';
import Lose from '../views/Lose';
import Win from '../views/Win';
import {onMuteAudio, onSummonAnimalTruck } from '../uiManager/Thunks'
import Buy from '../views/Buy';
import Sell from '../views/Sell';
import Animals from '../views/Animals'
import { Icons } from '../../assets/Assets';

interface Props {
    modal:Modal
    day:number
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
                    <div style={{position:'absolute', bottom:10,left:10}}>
                        <h6>Day {this.props.day}</h6>
                        <h6 style={{cursor:'pointer'}} onClick={onMuteAudio}>Mute</h6>
                        <div style={{backgroundImage: 'url('+Icons.animal_dealer+')', width:'24px', height:'24px', cursor:'pointer'}} onClick={onSummonAnimalTruck}/>
                    </div>
                </div>
        )
    }
}