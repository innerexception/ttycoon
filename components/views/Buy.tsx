import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onPlaceBuilding, onHideModal } from '../uiManager/Thunks';
import { store } from '../../App';
import { Buildings } from '../../assets/Assets';

export default class Buy extends React.Component {

    state = { selectedBuilding: null }

    render(){
        let state = store.getState()
        let selectedPlot = state.plots.find(p=>p.id ===state.buyingPlotId)
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>BUY</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {Buildings.map(b=>
                        <div style={{display:'flex', opacity: b.size <= selectedPlot.size ? 1 : 0.5}} onClick={()=>this.setState({selectedBuilding: b})}>
                            <div style={{backgroundImage: 'url('+b.asset+')', width:b.width, height:b.height, backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/>
                            <div>
                                <h4>{b.name} ${b.price}</h4>
                                <h5>{b.description}</h5>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{display:'flex'}}>
                    <div>{Button(true, ()=>onPlaceBuilding(this.state.selectedBuilding), 'Buy')}</div>
                    <div>{Button(true, onHideModal, 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
