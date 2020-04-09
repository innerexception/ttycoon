import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onReset } from '../uiManager/Thunks';

export default class Lose extends React.PureComponent {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>{Icon('cops', '', true)} One too many violations buddy. Off to the big house for you!</h2>
                <div>{Button(true, onReset, 'THE END')}</div>
            </div>
        )
    }
}
