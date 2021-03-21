import React from 'react';
import 'Src/scss/index.scss';
import Navigation from './Navigation';
import OptionList from './OptionList';
import Stats from './Stats';

function App(props) {
  return (
    <div className="App">
      <Navigation />
      <Stats />
      <OptionList />
    </div>
  );
}

export default App;