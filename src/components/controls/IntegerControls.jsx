import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/enum';
import CheckboxControl from './CheckboxControl';
import SpinboxControl from './SpinboxControl';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleDecrement() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    subtract: 1,
  });
}

function handleIncrement() {
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
  const value = getSelectedValue(props.option, props.options);
  const useSpinbox = (props.option.max !== 1 || props.option.min !== 0);

  return (
    <div className="IntegerControls">
      {useSpinbox ? <SpinboxControl
        handleDecrement={handleDecrement.bind(props)}
        handleIncrement={handleIncrement.bind(props)}
        min={props.option.min}
        max={props.option.max}
        value={value}
      /> : <CheckboxControl
        selected={value === 1}
        handleToggle={handleToggle.bind(props, value)}
      />}
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(IntegerControls);