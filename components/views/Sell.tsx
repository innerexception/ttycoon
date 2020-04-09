import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onSellBuilding, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';

export default class Sell extends React.Component {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'155px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('construction', '', true)}{Icon('construction', '', true)}CLEAR{Icon('construction', '', true)}{Icon('construction', '', true)}</h2>
                    <h4>Really destroy {store.getState().sellingBuilding.type}?</h4>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {Button(true, ()=>onSellBuilding(store.getState().sellingBuilding.id), 'Yes')}
                        {Button(true, ()=>onHideModal(), 'No')}
                    </div>
                </div>
            </div>
        )
    }
}
