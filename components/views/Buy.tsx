import * as React from 'react'
import AppStyles, { colors } from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPlacedBuilding, onHideModal, onStartPlaceBuilding } from '../uiManager/Thunks';
import * as v4 from 'uuid'
import { canAfford } from '../Util';
import { Buildings } from '../../assets/Assets';

export default class Buy extends React.Component {

    state = { selectedBuilding: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('construction', '', true)}{Icon('construction', '', true)}WE GON BUILD IT{Icon('construction', '', true)}{Icon('construction', '', true)}</h2>
                    <div style={{height:'78%', overflow:'auto'}}>
                        {Buildings.map(b=>
                            <div style={{margin:'1em',display:'flex', opacity: canAfford(b.price) ? 1 : 0.5}} onClick={canAfford(b.price) ? ()=>onStartPlaceBuilding({...b, id: v4(), animal: null, animalCount: 0, isActive: true}) :null}>
                                <div style={{backgroundImage: 'url('+b.asset+')', width:'50px', height:'50px', backgroundSize:'contain', backgroundPosition:"center", backgroundRepeat:'no-repeat'}}/>
                                <div style={{marginLeft:'1em', width:'75%'}}>
                                    <h5>{b.name} ${b.price}</h5>
                                    <h6 style={{color:colors.orange}}>{b.description}</h6>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
