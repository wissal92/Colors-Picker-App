import React, {Component} from 'react';
import ColorBox from './ColorBox';
import './Palette.css'

class Palette extends Component{
    render(){
        const colors = this.props.colors.map(color =>(
            <ColorBox background={color.color} name={color.name}/>
        ))
        return(
        <div className='Palette'>
            <div className='Palette-colors'>{colors}</div>
         </div>
        )
    }
}

export default Palette;