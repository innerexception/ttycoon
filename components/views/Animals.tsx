import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onStartPlaceAnimal, onDismissAnimalTruck } from '../uiManager/Thunks';
import { Animals } from '../../enum';
import { canAfford } from '../Util';

export default class Sell extends React.Component {

    state = { animalType: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'400px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>I GOT IT ALL</h2>
                {Animals.map(a=>
                    <div style={{margin:'1em', display:'flex', cursor:'pointer', opacity: canAfford(a.price) ? 1 : 0.5}} onClick={canAfford(a.price) ? ()=>onStartPlaceAnimal(a.assetName):null}>
                        <div style={{width:'24px', height:'24px', backgroundImage:'url('+require('../../assets/animals/'+a.assetName+'.png'), backgroundRepeat:'no-repeat'}}/>
                        <h4 style={{marginLeft:'1em', width:'75%'}}>{a.name} ${a.price}</h4>
                    </div>
                )}
                <div>{Button(true, onDismissAnimalTruck, 'Bye')}</div>
            </div>
        )
    }
}
