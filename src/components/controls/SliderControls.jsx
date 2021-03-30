import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { actions } from 'Include/enum';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(value) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    value,
  });
}

function SliderControls(props) {
  const value = getSelectedValue(props.option, props.options);
  let displayValue = value;
  if (props.option.transformedValue !== undefined) {
    displayValue = props.option.transformedValue;
  }
  return (
    <div className="SliderControls">
      <div className="slider-value">{displayValue}</div>
      <Slider
        {...props.option.sliderAttributes}
        min={props.option.min}
        max={props.option.max}
        value={value}
        onChange={handleChange.bind(props)}
      />
    </div>
  );
}

export default connect(state => ({ options: state.options }))(SliderControls);