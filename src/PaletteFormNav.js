import React, {Component} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';


class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = { newPaletteName: '', formShowing: false};
    }
    
   showForm = () =>{
     this.setState({formShowing: true})
   }

   hideForm = () =>{
     this.setState({formShowing: false})
   }
    render(){
        const {classes, open, handleSubmit, palettes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
            <AppBar
              position="fixed"
              color='default'
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.props.handleDrawerOpen}
                  className={classNames(classes.menuButton, {
                     [classes.hide]: open,
                  })}
                >
                  <AddToPhotosIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Create A Palette
                </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                  <Link to='/'>
                    <Button variant='contained' color='secondary' className={classes.button}>Go Back!</Button>
                </Link>
                <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                    Save
                </Button>
              </div>
            </AppBar>
            {this.state.formShowing && <PaletteMetaForm hideForm={this.hideForm} handleSubmit={handleSubmit} palettes={palettes}/>}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);