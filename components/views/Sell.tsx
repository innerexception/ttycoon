import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onSellBuilding, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';

export default class Sell extends React.Component {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>CLEAR</h2>
                <h4>Really destroy {store.getState().sellingBuilding.type}?</h4>
                <div>{Button(true, ()=>onSellBuilding(store.getState().sellingBuilding.id), 'Sell')}</div>
                <div>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
            </div>
        )
    }
}
