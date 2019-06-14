import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {format: 'hex', open: false};
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleChange(evt){
        this.setState({format: evt.target.value, open: true})
        this.props.handleChange(evt.target.value)
    }

    closeSnackbar(){
        this.setState({open: false});
    }
    render(){
        const {level, changeLevel, showingSlider} = this.props;
        const {format} = this.state;
        return (
            <header className='Navbar'>
              <div className='logo'>
                  <Link to='/'>reactcolorpicker</Link>
              </div>
              {showingSlider && (
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                </div>
              )}
               <div className='select-container'>
                   <Select value={format} onChange={this.handleChange}>
                       <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                       <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                       <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
                   </Select>
               </div>
               <Snackbar 
                 anchorOrigin={{vertical: 'bottom', horizontal:'left'}}
                 open={this.state.open}
                 autoHideDuration={3000}
                 message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
                 ContentProps={{'aria-describedby': 'message-id'}}
                 onClose={this.closeSnackbar}
                 action={[
                     <IconButton 
                        onClick={this.closeSnackbar} 
                        color='inherit' 
                        key='close'
                        aria-label ='close'
                      >
                         <CloseIcon/>
                    </IconButton>
                 ]}
               />
            </header>
        )
    }
}

export default Navbar;