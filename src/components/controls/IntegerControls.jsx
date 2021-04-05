import React from 'react';
import { connect } from 'react-redux';
import CheckboxControl from './CheckboxControl';
import SpinboxControl from './SpinboxControl';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleDecrement, handleIncrement, handleToggle } from '../../functions/handlers';

function IntegerControls(props) {
  // const value = getSelectedValue(props.option, props.options);
  // const useSpinbox = (props.option.max !== 1 || props.option.min !== 0);

  // return (
  //   <div className="IntegerControls">
  //     {useSpinbox ? <SpinboxControl
  //       handleDecrement={handleDecrement.bind(props, value)}
  //       handleIncrement={handleIncrement.bind(props, value)}
  //       min={props.option.min}
  //       max={props.option.max}
  //       value={value}
  //     /> : <CheckboxControl
  //       selected={value === 1}
  //       handleToggle={handleToggle.bind(props, value)}
  //     />}
  //   </div>
  // );

  // const value = getSelectedValue(props.optionKey);

  return <div className="IntegerControls">
    <CheckboxControl
      selected={props.selectedValue === 1}
      handleToggle={handleToggle.bind(props, props.selectedValue)}
    />
  </div>;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option),
    min: option.min,
    max: option.max,
  };
})(IntegerControls);