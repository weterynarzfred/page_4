import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { actions } from '../../include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';
import formatNumber from '../../functions/formatNumber';
import { deepClone } from '../../functions/deepFunctions';

function toLogScale(value) {
  if (this.logSlider === undefined) return value;
  let logValue = value / this.max;
  logValue = Math.pow(logValue, this.logSlider);
  logValue *= this.max;
  return isNaN(logValue) ? 0 : logValue;
}

function toLinearScale(logValue) {
  if (this.logSlider === undefined) return logValue;
  let value = logValue / this.max;
  value = Math.pow(value, 1 / this.logSlider);
  value *= this.max;
  return isNaN(value) ? 0 : value;
}

function handleChange(value) {
  if (
    value === undefined ||
    value === this.selectedValue
  ) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    value,
  });
}

function generateMarks(props) {
  const NUMBER_OF_SPACES = 8;

  const marks = {};
  for (let i = 0; i <= NUMBER_OF_SPACES; i++) {
    let val = i * props.max / NUMBER_OF_SPACES;
    let logVal = val;
    if (props.logSlider !== undefined) {
      logVal = toLogScale.call(props, logVal);

      const power = Math.floor(Math.log10(logVal) - 1);
      let adjustedLogVal = logVal * Math.pow(10, -power) || 0;
      adjustedLogVal = Math.round(adjustedLogVal / 10) * 10;
      adjustedLogVal = adjustedLogVal * Math.pow(10, power);

      let adjustedVal = adjustedLogVal / props.max;
      adjustedVal = Math.pow(adjustedVal, 1 / props.logSlider);
      adjustedVal *= props.max;

      val = adjustedVal;
      logVal = adjustedLogVal;
    }

    marks[val] = formatNumber(
      logVal,
      2,
      {
        usePercent: props.displayAsPercent,
        showSignificant: true,
      }
    );
  }

  return marks;
}

function SliderControls(props) {
  const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const updateTimeout = useRef();

  useEffect(() => {
    const value = props.selectedValue || 0;
    setSliderValue(toLinearScale.call(props, value));
    setInputValue(formatNumber(value, 2, { showSignificant: true }));
  }, []);

  useEffect(() => {
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      handleChange.call(props, toLogScale.call(props, sliderValue));
    }, 200);
  }, [sliderValue]);

  const attributes = deepClone(props.sliderAttributes);
  if (attributes?.marks === 'auto') {
    attributes.marks = generateMarks(props);
  }

  return (
    <div className="SliderControls option-controls">
      <input
        type="text"
        className="slider-value"
        value={inputValue}
        onChange={event => {
          const value = event.target.value;
          setInputValue(value);
          setSliderValue(toLinearScale.call(props, parseFloat(value)));
        }}
      />
      <Slider
        {...attributes}
        min={props.min}
        max={props.max}
        value={sliderValue}
        onChange={value => {
          setInputValue(formatNumber(toLogScale.call(props, value), 2, { showSignificant: true }));
          setSliderValue(value);
        }}
      />
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option, state.options),
    min: option.min,
    max: option.max,
    sliderAttributes: option.sliderAttributes,
    logSlider: option.logSlider,
    displayAsPercent: option.displayAsPercent,
  };
})(SliderControls);
