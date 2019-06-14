import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './ColorsHelper';
import PaletteList from './PaletteList';

class App extends Component {
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id; 
    });
  }
  render(){
    return (
      <Switch>
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>}/>
        <Route 
          exact 
          path='/palette/:id' 
          render={routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}
        />
        <Route 
          exact
          path='/palette/:paletteId/:colorId'
          render={() => <SingleColorPalette/>}
        />
      </Switch>
      //<Palette palette={generatePalette(seedColors[4])}/>
    );
  }
}

export default App;
