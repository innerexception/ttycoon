import * as React from 'react'
import AppStyles, { colors } from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onStartPlaceAnimal, onDismissAnimalTruck } from '../uiManager/Thunks';
import { Animals } from '../../enum';
import { canAfford } from '../Util';

export default class Sell extends React.Component {

    state = { animalType: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('TIGER', '', true)}{Icon('TIGER', '', true)}I GOT IT ALL{Icon('TIGER', '', true)}{Icon('TIGER', '', true)}</h2>
                    <div style={{height:'65%', overflow:'auto', padding:'1em'}}>
                        {Animals.map(a=>
                            <div style={{marginBottom:'0.5em'}}>
                                <div style={{marginBottom:'5px', display:'flex', cursor:'pointer', opacity: canAfford(a.price) ? 1 : 0.5}} onClick={canAfford(a.price) ? ()=>onStartPlaceAnimal(a.assetName):null}>
                                    <div style={{width:'24px', height:'24px', backgroundImage:'url('+require('../../assets/animals/'+a.assetName+'.png'), backgroundRepeat:'no-repeat'}}/>
                                    <h4 style={{marginLeft:'1em', width:'75%'}}>{a.name} ${a.price}</h4>
                                </div>
                                <h5 style={{color: colors.orange}}>{a.description}</h5>
                            </div>
                        )}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{Button(true, onDismissAnimalTruck, 'Bye')}</div>
                </div>
            </div>
        )
    }
}
