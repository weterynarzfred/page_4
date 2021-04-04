import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { actions } from 'Include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(value) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    value,
  });
}

function SliderControls(props) {
  const [_value, set_value] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [updateTimeout, setUpdateTimeout] = useState();

  useEffect(() => {
    const value = props.option.selected || 0;
    set_value(value);
  }, []);

  useEffect(() => {
    const now = new Date().getTime();
    if (now < lastUpdate + 100) {
      clearTimeout(updateTimeout);
      setUpdateTimeout(setTimeout(() => {
        handleChange.call(props, _value);
        setLastUpdate(now);
      }, 100));
      return;
    }
    handleChange.call(props, _value);
    setLastUpdate(now);
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