import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onSellBuilding, onHideModal } from '../uiManager/Thunks';

export default class Sell extends React.Component {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>I GOT IT ALL</h2>
                {Animals.map(a=>
                    <div style={{display:'flex'}}>
                        <div/>
                        <h4>{a.name}</h4>
                    </div>
                )}
                <div>{Button(true, ()=>onStartPlaceAnimal(), 'Buy')}</div>
                <div>{Button(true, onHideModal, 'Cancel')}</div>
            </div>
        )
    }
}
