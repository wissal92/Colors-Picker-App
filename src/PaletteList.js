import React, {Component} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import styles from './styles/PaletteListStyles';

class PaletteList extends Component{
    constructor(props){
        super(props);
        this.state = {openDeleteDialog: false, deletingId: ''};
    }

    openDialog = id =>{
        this.setState({openDeleteDialog: true, deletingId: id})
    }

    closeDialog = () =>{
        this.setState({openDeleteDialog: false, deletingId: ''})
    }

    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }

    handleDelete = () =>{
        this.props.deletePalette(this.state.deletingId)
        this.closeDialog();
    }

    render(){
        const {palettes, classes} = this.props;
        const {openDeleteDialog} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                       <h1 className={classes.heading}>React Colors</h1>
                       <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                      <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette =>(
                          <CSSTransition key={palette.id} classNames='fade' timeout={1000}>
                             <MiniPalette 
                                {...palette} 
                                key={palette.id} 
                                id={palette.id} 
                                //handleDelete={deletePalette} 
                                openDialog={this.openDialog}
                                handleClick={() => this.goToPalette(palette.id)}
                              />
                          </CSSTransition>
                         ))}
                       </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id='delete-dialog-title'>Do You Want To Delete This Palette?</DialogTitle>
                      <List>
                          <ListItem button onClick={this.handleDelete}>
                              <ListItemAvatar>
                                  <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                      <CheckIcon/>
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText>Delete</ListItemText>
                          </ListItem>
                          <ListItem button onClick={this.closeDialog}>
                              <ListItemAvatar>
                                  <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                      <CloseIcon/>
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText>Cancel</ListItemText>
                          </ListItem>
                      </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);