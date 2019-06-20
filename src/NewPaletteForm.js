import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import {arrayMove} from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component{
  static defaultProps = {
       maxColor: 20
  }
    constructor(props){
        super(props);
        this.state = {
            open: false,
            colors: seedColors[0].colors
          };
    }
   
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      createColor = newColor =>{
          this.setState({colors: [...this.state.colors, newColor]})
      }
      
      handleChange = evt =>{
          this.setState({[evt.target.name]: evt.target.value})
      }

      handleSubmit = newPalette =>{
          newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
          newPalette.colors = this.state.colors;
          this.props.savePalette(newPalette);
          this.props.history.push('/');
      }

      removeColor = colorName =>{
          this.setState({colors: this.state.colors.filter(color => color.name !== colorName)})
      }

      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      }

      clearPalette = () =>{
        this.setState({colors: []})
      }

      addRandomColor = () =>{
        const allColors = this.props.palettes.map(c => c.colors).flat()
        let rand = Math.floor(Math.random() * allColors.length)
        let randColor;
        let isDuplicateColor = true;
        while(isDuplicateColor){
          rand = Math.floor(Math.random() * allColors.length);
          randColor = allColors[rand];
          isDuplicateColor = this.state.colors.some(color => color.name === randColor.name)
        }
        this.setState({colors: [...this.state.colors, randColor]})
      }

      render() {
        const { classes, maxColor, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteFull = colors.length >= maxColor;
        return (
          <div className={classes.root}>
            <PaletteFormNav open={open} palettes={palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <div className={classes.container}>
                <Typography variant='h4' gutterBottom>Design your Palette</Typography>
                <div className={classes.buttons}>
                  <Button 
                    variant='contained' 
                    color='secondary' 
                    onClick={this.clearPalette}
                    className={classes.button}
                  >
                    Clear Palette
                  </Button>
                  <Button 
                    variant='contained' 
                    color='primary' 
                    disabled={paletteFull} 
                    onClick={this.addRandomColor}
                    className={classes.button}
                  >
                    Random Color
                  </Button>
                </div>
                <ColorPickerForm paletteFull={paletteFull} createColor={this.createColor} colors={colors}/>
              </div>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <DraggableColorList 
                colors={colors} 
                removeColor={this.removeColor} 
                axis='xy' 
                onSortEnd={this.onSortEnd}
                distance={20}
              />
            </main>
          </div>
        );
      }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);