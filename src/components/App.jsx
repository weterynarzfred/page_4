
import React from 'react';
import { connect } from 'react-redux';
import './../scss/index.scss';
import OptionList from './OptionList';

function App(props) {
  return (
    <div className="App">
      <OptionList />
    </div>
  );
}

export default connect()(App);