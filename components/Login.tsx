import * as React from 'react';
import AppStyles, { colors } from '../AppStyles';
import { ButtonStrip, Select, Button } from './Shared'
import { onInitSession, onShowModal } from './uiManager/Thunks';
import { Difficulty, Modal } from '../enum';
const boot = require('../assets/audio/intro.mp3')
const roar = require('../assets/audio/roar.mp3')

interface Props {
    
}

export default class Login extends React.Component<Props> {

    state = { transitionState: 0, roar: new Audio(roar) }

    componentDidMount(){
        this.state.roar.volume = 0.2
    }

    componentWillUnmount(){
        // this.state.audio.pause()
    }

    render(){
        return (
        <div style={{display:'flex', alignItems:'center', backgroundPosition:'center', width:'100%', backgroundImage:'url('+require('../assets/bg.jpg')}}>
            <div>
                <h3 style={{fontFamily:'Title', fontSize:'75px', paddingLeft:'10px', color:colors.orange}}>Tiger Tycoon</h3>
                <div style={{padding:'10px'}}>
                    <div style={{marginBottom:'10px'}}>
                    {ButtonStrip([
                        {text: 'Start', handler: ()=>{this.state.roar.play(); onInitSession(Difficulty.EASY)}, active: false},
                    ])}
                    </div>
                </div>
            </div>
            <div style={{backgroundSize:'contain', width:'800px', height:'200px', backgroundImage:'url('+require('../assets/Tigre.png')}}></div>
        </div>
        )
    }
}