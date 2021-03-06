import React from 'react';
import { connect } from 'react-redux';
import CheckboxControl from './CheckboxControl';
import SpinboxControl from './SpinboxControl';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleDecrement, handleIncrement, handleToggle } from '../../functions/handlers';

function IntegerControls(props) {
  if (props.max === props.min) return null;
  // if (props.topLevel) return null;
  const useSpinbox = (props.max !== 1 || props.min !== 0);

  return <div className="IntegerControls">
    {useSpinbox ? <SpinboxControl
      handleDecrement={handleDecrement.bind(props, props.selectedValue)}
      handleIncrement={handleIncrement.bind(props, props.selectedValue)}
      min={props.min}
      max={props.max}
      value={props.selectedValue}
    /> : <CheckboxControl
      selected={props.selectedValue === 1}
      handleToggle={handleToggle.bind(props, props.selectedValue)}
    />}
  </div>;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option, state.options),
    min: option.min,
    max: option.max,
  };
})(IntegerControls);
