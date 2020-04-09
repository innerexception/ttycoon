import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPlacedBuilding, onHideModal, onStartPlaceBuilding } from '../uiManager/Thunks';
import * as v4 from 'uuid'
import { canAfford } from '../Util';
import { Buildings } from '../../assets/Assets';

export default class Buy extends React.Component {

    state = { selectedBuilding: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>WE GON BUILD IT</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {Buildings.map(b=>
                        <div style={{margin:'1em',display:'flex', opacity: canAfford(b.price) ? 1 : 0.5}} onClick={canAfford(b.price) ? ()=>onStartPlaceBuilding({...b, id: v4(), animal: null, animalCount: 0, isActive: true}) :null}>
                            <div style={{backgroundImage: 'url('+b.asset+')', width:'50px', height:'50px', backgroundSize:'contain', backgroundPosition:"center", backgroundRepeat:'no-repeat'}}/>
                            <div style={{marginLeft:'1em', width:'75%'}}>
                                <h5>{b.name} ${b.price}</h5>
                                <h6>{b.description}</h6>
                            </div>
                        </div>
                    )}
                </div>
                <div>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
            </div>
        )
    }
}
