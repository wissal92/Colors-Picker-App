import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './ColorsHelper'

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <Palette {...seedColors[4]}/>
  );
}

export default App;
