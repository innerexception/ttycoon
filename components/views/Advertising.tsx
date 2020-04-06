import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onBuyAd, onHideModal } from '../uiManager/Thunks';
import { Ads } from '../../enum';

export default class Advertising extends React.Component {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'350px', width:'550px', justifyContent:'space-between', backgroundSize:'cover'}}>
                <h2>BUY</h2>
                <div style={{height:'80%', overflow:'auto'}}>
                    {Ads.map(b=>
                        <div style={{display:'flex'}} onClick={()=>onBuyAd(b)}>
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
