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


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(105vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class NewPaletteForm extends Component{
  static defaultProps = {
       maxColor: 20
  }
    constructor(props){
        super(props);
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors,
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

      handleSubmit = newPaletteName =>{
          let newName = this.state.newPaletteName;
          const newPalette = {
              paletteName: newPaletteName,
              id: newPaletteName.toLowerCase().replace(/ /g, '-'),
              colors: this.state.colors
          };
          this.props.savePalette(newPalette)
          this.props.history.push('/')
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
        const randColor = allColors[rand];
        this.setState({colors: [...this.state.colors, randColor]})
      }

      render() {
        const { classes, maxColor, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteFull = colors.length >= maxColor;
        return (
          <div className={classes.root}>
            <PaletteFormNav open={open} classes={classes} palettes={palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
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
              <Typography variant='h4'>Design your Palette</Typography>
              <div>
                 <Button variant='contained' color='secondary' onClick={this.clearPalette}>Clear Palette</Button>
                 <Button variant='contained' color='primary' disabled={paletteFull} onClick={this.addRandomColor}>Random Color</Button>
              </div>
              <ColorPickerForm paletteFull={paletteFull} createColor={this.createColor} colors={colors}/>
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
              />
            </main>
          </div>
        );
      }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);