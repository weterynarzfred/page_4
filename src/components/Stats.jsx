import React from 'react';
import { connect } from 'react-redux';
import Currencies from './Currencies';
import Warnings from './Warnings';

function Stats(props) {
  return (
    <div className="Stats">
      <Currencies currencies={props.currencies} />
      <Warnings />
    </div>
  );
}

export default connect(state => ({ currencies: state.currencies }))(Stats);