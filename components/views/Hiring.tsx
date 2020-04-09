import * as React from 'react'
import AppStyles, { colors } from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onHire, onHideModal } from '../uiManager/Thunks';
import { getRandomInmates, canAfford } from '../Util';
import { store } from '../../App';

export default class Hiring extends React.Component {

    state = { inmates: getRandomInmates() }

    render(){
        let state = store.getState()
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('convict', '', true)}{Icon('convict', '', true)}BARNEY COUNTY JAIL{Icon('convict', '', true)}{Icon('convict', '', true)}</h2>
                    <h3 style={{paddingLeft:'0.5em'}}>Parolled today (Hiring "fee" $500):</h3>
                    <div style={{padding:'0.5em', paddingBottom:0}}>
                        {state.employees.length <= state.maxEmployees ? 
                        this.state.inmates.map(b=>
                            <div style={{display:'flex', marginBottom:'0.5em', cursor:'pointer', opacity: canAfford(500) ? 1 :0.5}} onClick={canAfford(500) ? ()=>onHire(b) : null}>
                                <div>
                                    <h4 style={{color: colors.orange}}>{b.name}</h4>
                                    <h5>${b.price}/day</h5>
                                    <h5>Chance of arrest: {b.riskLevel}%</h5>
                                </div>
                            </div>
                        ) : <h3 style={{margin:'1em'}}>Build More Housing!</h3>}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <div>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
                    </div>
                </div>
            </div>
        )
    }
}
