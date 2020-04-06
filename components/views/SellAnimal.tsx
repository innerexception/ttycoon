import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onSellAnimal, onDismissBuyer } from '../uiManager/Thunks';
import { store } from '../../App';

export default class SellAnimal extends React.Component {

    state = { animalType: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>WHAT YOU SELLIN</h2>
                {store.getState().buildings.map(b=>
                    <div style={{display:'flex', cursor:'pointer'}} onClick={()=>onSellAnimal(b)}>
                        <div style={{width:'24px', height:'24px', backgroundImage:'url('+require('../../assets/animals/'+b.animal+'.png')}}/>
                        <h4>{b.name}</h4>
                    </div>
                )}
                <div>{Button(true, onDismissBuyer, 'Bye')}</div>
            </div>
        )
    }
}
