import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPay, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';


export default class LoanShark extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>PAY UP</h2>
                {Button(canAfford(100), ()=>onPay(100), 'Pay $100')}
                {Button(canAfford(1000), ()=>onPay(1000), 'Pay $1000')}
                {Button(canAfford(10000), ()=>onPay(10000), 'Pay $10000')}
                <div>{Button(true, ()=>onHideModal(), 'DONE')}</div>
            </div>
        )
    }
}

const canAfford = (amount:number) => {
    return store.getState().cash >= amount && store.getState().loan >= amount
}