import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state = {currentColor: 'teal', newColorName: ''}
    }
    
    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', value => 
          this.props.colors.every(
               ({name}) => name.toLowerCase() !== value.toLowerCase()
           )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
          this.props.colors.every(
               ({color}) =>  color !== this.state.currentColor
           )
        );
    }

    handleSubmit = () =>{
        const newColor = {
           color: this.state.currentColor,
           name: this.state.newColorName
        }

        this.props.createColor(newColor);
        this.setState({newColorName: ''})
    }

    updateCurrentColor = newColor =>{
        this.setState({currentColor: newColor.hex})
    }

    handleChange = evt =>{
        this.setState({[evt.target.name]: evt.target.value})
    }

    render(){
        const {paletteFull} = this.props;
        const {currentColor, newColorName} = this.state;
        return(
            <div>
              <ChromePicker 
                color={currentColor}
                onChangeComplete={this.updateCurrentColor}
               />
               <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                   <TextValidator 
                       value={newColorName} 
                       name='newColorName'
                       onChange={this.handleChange}
                       validators={['required', 'isNameUnique', 'isColorUnique']}
                       errorMessages={['Enter a Color Name', 'Color name must be unique', 'Color already used!']}
                    />
                   <Button 
                        variant='contained' 
                        color='primary' 
                        disabled={paletteFull}
                        style={{backgroundColor: paletteFull ? 'grey' : currentColor}}
                        type='submit'
                        >
                        {paletteFull ? 'Full Palette' : 'Add Color'}
                   </Button>
               </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;