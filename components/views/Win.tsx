import * as React from 'react'
import AppStyles from '../../AppStyles';
import { onReset } from '../uiManager/Thunks';
import { Button, Icon } from '../Shared';

export default class Win extends React.PureComponent {
    render(){
        return (
            <div style={{...AppStyles.modal, height:'100px', width:'450px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>{Icon('TIGER', '', true)}{Icon('TIGER', '', true)}YOU ARE THE KING OF TIGERS{Icon('TIGER', '', true)}{Icon('TIGER', '', true)}</h2>
                <div>{Button(true, onReset, 'VICTORY')}</div>
            </div>
        )
    }
}
