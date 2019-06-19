import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './ColorsHelper';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {palettes: savedPalettes || seedColors};
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id; 
    });
  }

  savePalette = newPalette =>{
       this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }

  deletePalette = id => {
    this.setState(st => ({palettes: st.palettes.filter(palette => palette.id !== id)}), this.syncLocalStorage)
  }

  syncLocalStorage = () => {
       window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render(){
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
            <Route
              exact
              path='/palette/new' 
              render={(routeProps) => (
                <div className='page'>
                    <NewPaletteForm 
                      savePalette={this.savePalette} 
                      palettes={this.state.palettes} 
                      {...routeProps}
                    />
                </div>
                )}
            />
            <Route 
              exact 
              path='/' 
              render={(routeProps) =>(
                <div className='page'>
                 <PaletteList 
                    palettes={this.state.palettes} 
                    deletePalette={this.deletePalette} 
                    {...routeProps}
                  />
                </div>
              )}
            />
            <Route 
              exact 
              path='/palette/:id' 
              render={routeProps => (
                <div className='page'>
                  <Palette 
                     palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                  />
                </div>
              )}
            />
            <Route 
              exact
              path='/palette/:paletteId/:colorId'
              render={routeProps => (
                <div className='page'>
                  <SingleColorPalette 
                      colorId={routeProps.match.params.colorId} 
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                  />
                </div>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      )}/>

      //<Palette palette={generatePalette(seedColors[4])}/>
    );
  }
}

export default App;
