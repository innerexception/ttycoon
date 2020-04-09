import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onBuyMeat, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';


export default class Meat extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'191px', width:'351px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('MEAT', '', true)}{Icon('MEAT', '', true)}MEAT{Icon('MEAT', '', true)}{Icon('MEAT', '', true)}</h2>
                    {Button(canAffordMeat(1), ()=>onBuyMeat(1), 'Buy 1')}
                    {Button(canAffordMeat(10), ()=>onBuyMeat(10), 'Buy 10')}
                    {Button(canAffordMeat(100), ()=>onBuyMeat(100), 'Buy 100')}
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{Button(true, ()=>onHideModal(), 'DONE')}</div>
                </div>
            </div>
        )
    }
}

const canAffordMeat = (amount:number) => {
    return store.getState().cash >= amount * 5
}