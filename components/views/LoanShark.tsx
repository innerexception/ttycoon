import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPay, onHideModal, onGetLoan } from '../uiManager/Thunks';
import { store } from '../../App';


export default class LoanShark extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>PAY UP</h2>
                {Button(true, ()=>onGetLoan(1000), '$1000 Loan')}
                {Button(true, ()=>onGetLoan(10000), '$10000 Loan')}
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