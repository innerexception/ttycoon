import * as React from 'react';
import AppStyles, { colors } from '../../AppStyles'
import CanvasFrame from '../canvas/CanvasFrame';
import Splash from '../Splash';

interface Props {
    modal:Modal
    day:number
    difficulty: Difficulty
    cash: number
    meat: number
    admission: number
    peta: number
}

export default class UIManager extends React.Component<Props> {

    render(){
        return (
            <div style={styles.frame}>
                {!this.props.difficulty && <Splash/>}
                {this.props.difficulty && <CanvasFrame {...this.props}/>}
            </div>
        )
    }
}

const styles = {
    frame: {
        height: '100vh',
        background: colors.background,
        overflow:'hidden',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center'
    },
    dot: {
        height:'0.5em',
        width:'0.5em',
        borderRadius: '0.5em'
    },
    statusDot: {
        position:'absolute' as 'absolute', bottom:'0.5em', right:'0.5em',
        display:'flex',
        color: colors.black,
        alignItems:'center'
    }
}