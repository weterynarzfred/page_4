import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';

function handleDecrement() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: 1,
  });
}

function handleIncrement() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    subtract: 1,
  });
}

function IntegerControls(props) {
  return (
    <div className="IntegerControls">
      <button onClick={handleIncrement.bind(props)}>decrement</button>
      <button onClick={handleDecrement.bind(props)}>increment</button>
      <div className="integer-value">{getSelected(props.option, props.selected)}</div>
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(IntegerControls);