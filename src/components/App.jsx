import React from 'react';
import 'Src/scss/index.scss';
import OptionList from './OptionList';
import Stats from './Stats';

function App(props) {
  return (
    <div className="App">
      <Stats />
      <OptionList />
    </div>
  );
}

export default (App);