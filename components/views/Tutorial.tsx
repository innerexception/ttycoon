import * as React from 'react'
import AppStyles from '../../AppStyles';
import { onReset, onHideModal } from '../uiManager/Thunks';
import { Button, Icon } from '../Shared';

export default class Tutorial extends React.Component {

    state = { step: 0 }

    renderStep = () => {
        switch(this.state.step){
            case 0:
                return <div style={{padding:'1em', height:'90%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                            <h4>Dear brother,</h4>
                            <h5 style={{marginBottom:'5px'}}>If you are reading this it means that I am dead.</h5>
                            <h5 style={{marginBottom:'5px'}}>Who knows what happened, but I hope it involved firearms, explosives, and a couple of tigers.</h5>
                            <h5 style={{marginBottom:'5px'}}>I'm leaving you the land where my tiger park used to be before the cops took it, and my cellphone, which has all the contacts you'll need to become the next Tiger Tycoon of our fair state.</h5>
                            <h5 style={{marginBottom:'5px'}}>Don't worry, my spirit will always be with you.</h5>
                            <h5 style={{marginBottom:'5px'}}>Signed, </h5>
                            <div style={{display:'flex'}}>
                                {Icon('doc', '', true)}<h3 style={{fontFamily:'Title', marginLeft:'5px'}}>Doc Exotic, Tiger Tycoon</h3>
                            </div>
                            <div>{Button(true, ()=>this.setState({step:1}), "Turn to page 2")}</div>
                        </div>
            case 1: 
                return <div style={{padding:'1em', height:'90%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                            <h4>To Become A Tiger Tycoon:</h4>
                            <h3 style={{marginBottom:'5px'}}>Build some cages. Then put some tigers in them. Profit!</h3>
                            <h5 style={{marginBottom:'5px'}}>1. Have at least 50 tigers.</h5>
                            <h5 style={{marginBottom:'5px'}}>2. Be debt free and have 100 grand in the bank.</h5>
                            <h5 style={{marginBottom:'5px'}}>First, talk to Scooter {Icon('builder', 'Scooter', true)} about buildings.</h5>
                            <h5 style={{marginBottom:'5px'}}>Then, talk to Bob {Icon('animal_dealer', 'Bob', true)} about animals. He's a little skittish, but solid. If you get at least 2 in one pen, you'll get more! Birds and bees and all that.</h5>
                            <h5 style={{marginBottom:'5px'}}>I bet you can figure it out from there! Oh, and stay out of trouble</h5>
                            <div>{Button(true, ()=>onHideModal(), "Go get 'em Tiger!")}</div>
                       </div>
        }
    }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'409px', width:'551px'}}>
                <div style={{...AppStyles.modalInner}}>
                    {this.renderStep()}
                </div>
            </div>
        )
    }
}
