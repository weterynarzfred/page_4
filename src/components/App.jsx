import React from 'react';
import 'Src/scss/index.scss';
import OptionList from 'Components/OptionList';
import Stats from 'Components/Stats';

function App(props) {
  return (
    <div className="App">
      <Stats />
      <OptionList />
    </div>
  );
}

export default (App);