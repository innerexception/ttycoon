import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onReset } from '../uiManager/Thunks';

export default class Lose extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'155px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('cops', '', true)} One too many violations buddy. Off to the big house for you!</h2>
                    <div>{Button(true, onReset, 'THE END')}</div>
                </div>
            </div>
        )
    }
}
