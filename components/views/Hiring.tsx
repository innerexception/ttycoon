import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onHire, onHideModal } from '../uiManager/Thunks';
import { getRandomInmates } from '../Util';

export default class Hiring extends React.Component {

    state = { selectedBuilding: null }

    render(){
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>BARNEY COUNTY JAIL</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {getRandomInmates().map(b=>
                        <div style={{display:'flex'}} onClick={()=>onHire(b)}>
                            <div style={{backgroundImage: 'url('+b.asset+')', width:b.width, height:b.height, backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/>
                            <div>
                                <h4>{b.name} ${b.price}</h4>
                                <h5>{b.description}</h5>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{display:'flex'}}>
                    <div>{Button(true, onHideModal, 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
