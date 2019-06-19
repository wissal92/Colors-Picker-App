import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component{
    constructor(props){
        super(props);
        this.state = {open: true, newPaletteName: ''}
    }
  

  componentDidMount(){
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
    this.props.palettes.every(
         ({paletteName}) =>  paletteName.toLowerCase() !== value.toLowerCase()
     )
   );  
}

  handleChange = evt =>{
    this.setState({[evt.target.name]: evt.target.value})
   }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {newPaletteName} = this.state;
    const {handleSubmit} = this.props;
    return (
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
               Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
                      <TextValidator 
                          label='Palette Name' 
                          name='newPaletteName' 
                          value={newPaletteName} 
                          onChange={this.handleChange}
                          fullWidth
                          margin='normal'
                          validators={['required', 'isPaletteNameUnique']}
                          errorMessages={['Palette Name Is Required', 'Name Already Used!']}
                      />
                    
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button 
               variant='contained' 
               color='primary' 
               type='submit'
            >
               Save Palette
           </Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
    );
  }
}

export default PaletteMetaForm;