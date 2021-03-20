import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/enum';
import getSelected from 'Functions/getSelected';
import CheckboxControl from 'Components/controls/CheckboxControl';
import SpinboxControl from 'Components/controls/SpinboxControl';

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

  return (
    <div className="IntegerControls">
      {useSpinbox ? <SpinboxControl
        handleDecrement={handleDecrement.bind(props, value)}
        handleIncrement={handleIncrement.bind(props, value)}
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

export default connect(state => ({ selected: state.selected }))(IntegerControls);