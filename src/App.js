import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

function App() {
  return (
    <Palette {...seedColors[4]}/>
  );
}

export default App;
