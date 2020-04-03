import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPlacedBuilding, onHideModal, onStartPlaceBuilding } from '../uiManager/Thunks';
import { store } from '../../App';
import { Buildings } from '../../assets/Assets';

export default class Buy extends React.Component {

    state = { selectedBuilding: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>BUY</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {Buildings.map(b=>
                        <div style={{display:'flex'}} onClick={()=>onStartPlaceBuilding(b)}>
                            <div style={{backgroundImage: 'url('+b.asset+')', width:b.width, height:b.height, backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/>
                            <div>
                                <h4>{b.name} ${b.price}</h4>
                                <h5>{b.description}</h5>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{display:'flex'}}>
                    <div>{Button(true, onHideModal, 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
