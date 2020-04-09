import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onBuyAd, onHideModal } from '../uiManager/Thunks';
import { Ads } from '../../enum';
import { canAfford } from '../Util';

export default class Advertising extends React.Component {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'359px', width:'551px'}}>
                <div style={AppStyles.modalInner}>
                    <h2 style={{textAlign:'center'}}>{Icon('ads', '', true)}{Icon('sale', '', true)}BUY BUY BUY!{Icon('sale', '', true)}{Icon('ads', '', true)}</h2>
                    <div style={{height:'78%', overflow:'auto'}}>
                        {Ads.map(b=>
                            <div style={{margin:'1em', display:'flex', alignItems:'center', cursor:'pointer', opacity: canAfford(b.price) ? 1 : 0.5}} onClick={canAfford(b.price) ? ()=>onBuyAd(b):null}>>
                                <div style={{backgroundImage: 'url('+b.asset+')', width:'50px', height:'50px', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}/>
                                <div style={{marginLeft:'1em', width:'75%'}}>
                                    <h5 style={{marginBottom: '1em'}}>{b.description}</h5>
                                    <h4>${b.price}</h4>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{Button(true, ()=>onHideModal(), 'Cancel')}</div>
                </div>
            </div>
        )
    }
}
