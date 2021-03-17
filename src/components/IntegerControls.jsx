import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';

function handleDecrement(value) {
  if (value <= this.option.min) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    subtract: 1,
  });
}

function handleIncrement(value) {
  if (value >= this.option.max) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: 1,
  });
}

function handleToggle(value) {
  if (value === 1) handleDecrement.call(this);
  else handleIncrement.call(this);
}

function IntegerControls(props) {
  const value = getSelected(props.option, props.selected);
  const useSpinbox = (props.option.max !== 1 || props.option.min !== 0);

  const spinbox = <div className="integer-spinbox">
    <div className="integer-spinbox-content">
      <button
        onClick={handleDecrement.bind(props, value)}
        className={classNames({ disabled: value <= props.option.min })}
      >-</button>
      <div className="integer-value">{value}</div>
      <button
        onClick={handleIncrement.bind(props, value)}
        className={classNames({ disabled: value >= props.option.max })}
      >+</button>
    </div>
  </div>;

  const checkbox = <div
    className={classNames('integer-checkbox', { checked: value === 1 })}
    onClick={handleToggle.bind(props, value)}
  ></div>;

  return (
    <div className="IntegerControls">
      {useSpinbox ? spinbox : checkbox}
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(IntegerControls);