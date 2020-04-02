import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onSellBuilding, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';

export default class Sell extends React.Component {

    state = { sellingPlotId: store.getState().sellingPlotId }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>SELL</h2>
                <h4>Really sell {store.getState().plots.find(p=>p.id===this.state.sellingPlotId).building.type}?</h4>
                <div>{Button(true, ()=>onSellBuilding(), 'Sell')}</div>
                <div>{Button(true, onHideModal, 'Cancel')}</div>
            </div>
        )
    }
}
