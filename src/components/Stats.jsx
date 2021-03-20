import React from 'react';
import { connect } from 'react-redux';
import Currencies from 'Components/Currencies';
import Warnings from 'Components/Warnings';

function Stats(props) {
  return (
    <div className="Stats">
      <Currencies currencies={props.currencies} />
      <Warnings />
    </div>
  );
}

export default connect(state => ({ currencies: state.currencies }))(Stats);