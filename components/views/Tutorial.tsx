import * as React from 'react'
import AppStyles from '../../AppStyles';
import { onReset, onHideModal } from '../uiManager/Thunks';
import { Button, Icon } from '../Shared';

export default class Tutorial extends React.PureComponent {
    render(){
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    
                    <div>{Button(true, ()=>onHideModal(), "Let's GO!")}</div>
                </div>
            </div>
        )
    }
}
