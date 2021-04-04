import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { actions } from 'Include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(value) {
  if (
    value === undefined ||
    value === this.option.selected
  ) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    value,
  });
}

function SliderControls(props) {
  const [_value, set_value] = useState();
  const [updateTimeout, setUpdateTimeout] = useState();

  useEffect(() => {
    const value = props.option.selected || 0;
    set_value(value);
  }, []);

  useEffect(() => {
    clearTimeout(updateTimeout);
    setUpdateTimeout(setTimeout(() => {
      handleChange.call(props, _value);
    }, 200));
  }, [_value]);

  const value = getSelectedValue(props.option);
  let displayValue = value;
  if (props.option.transformedDisplay !== undefined) {
    displayValue = props.option.transformedDisplay;
  }
  return (
    <div className="SliderControls">
      <div className="slider-value">{displayValue}</div>
      <Slider
        {...props.option.sliderAttributes}
        min={props.option.min}
        max={props.option.max}
        value={_value}
        onChange={value => set_value(value)}
      />
    </div>
  );
}

export default connect()(SliderControls);