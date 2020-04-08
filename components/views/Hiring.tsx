import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onHire, onHideModal } from '../uiManager/Thunks';
import { getRandomInmates } from '../Util';
import { store } from '../../App';

export default class Hiring extends React.Component {

    state = { inmates: getRandomInmates() }

    render(){
        let state = store.getState()
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>BARNEY COUNTY JAIL</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {state.employees.length <= state.maxEmployees ? 
                    this.state.inmates.map(b=>
                        <div style={{display:'flex'}} onClick={()=>onHire(b)}>
                            <div>
                                <h4>{b.name}</h4>
                                <h5>${b.price}/day</h5>
                                <h5>Chance of arrest: {b.riskLevel}%</h5>
                            </div>
                        </div>
                    ) : <h3>Not Enough Housing!</h3>}
                </div>
                <div style={{display:'flex'}}>
                    <div>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
