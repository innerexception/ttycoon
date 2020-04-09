import * as React from 'react'
import AppStyles, { colors } from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onHire, onHideModal } from '../uiManager/Thunks';
import { getRandomInmates } from '../Util';
import { store } from '../../App';

export default class Hiring extends React.Component {

    state = { inmates: getRandomInmates() }

    render(){
        let state = store.getState()
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('convict', '', true)}{Icon('convict', '', true)}BARNEY COUNTY JAIL{Icon('convict', '', true)}{Icon('convict', '', true)}</h2>
                    <h3 style={{paddingLeft:'0.5em'}}>Parolled today:</h3>
                    <div style={{padding:'0.5em'}}>
                        {state.employees.length <= state.maxEmployees ? 
                        this.state.inmates.map(b=>
                            <div style={{display:'flex', marginBottom:'0.5em', cursor:'pointer'}} onClick={()=>onHire(b)}>
                                <div>
                                    <h4 style={{color: colors.orange}}>{b.name}</h4>
                                    <h5>${b.price}/day</h5>
                                    <h5>Chance of arrest: {b.riskLevel}%</h5>
                                </div>
                            </div>
                        ) : <h3>Not Enough Housing!</h3>}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <div>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
                    </div>
                </div>
            </div>
        )
    }
}
