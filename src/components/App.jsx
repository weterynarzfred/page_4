
import React from 'react';
import { connect } from 'react-redux';
import './../scss/index.scss';
import OptionList from './OptionList';
import Stats from './Stats';

function App(props) {
  return (
    <div className="App">
      <Stats currencies={props.currencies} />
      <OptionList />
    </div>
  );
}

export default connect(state => ({ currencies: state.currencies }))(App);