import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPay, onHideModal, onGetLoan } from '../uiManager/Thunks';
import { store } from '../../App';


export default class LoanShark extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'259px', width:'451px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('CASH', '', true)}{Icon('CASH', '', true)}PAY UP!{Icon('CASH', '', true)}{Icon('CASH', '', true)}</h2>
                    <h3 style={{textAlign:'center'}}>You owe me ${store.getState().loan}</h3>
                    {Button(true, ()=>onGetLoan(1000), 'Take $1000 Loan')}
                    {Button(true, ()=>onGetLoan(10000), 'Take $10000 Loan')}
                    {Button(canAfford(1000), ()=>onPay(1000), 'Pay $1000')}
                    {Button(canAfford(10000), ()=>onPay(10000), 'Pay $10000')}
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{Button(true, ()=>onHideModal(), 'DONE')}</div>
                </div>
            </div>
        )
    }
}

const canAfford = (amount:number) => {
    return store.getState().cash >= amount && store.getState().loan >= amount
}