import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { actions } from 'Include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';
import formatNumber from '../../functions/formatNumber';
import { deepClone } from '../../functions/deepFunctions';

const { createSliderWithTooltip } = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider);

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

function SliderControls(props) {
  const [_value, set_value] = useState();
  const updateTimeout = useRef();

  useEffect(() => {
    const value = props.selectedValue || 0;

    if (props.logSlider !== undefined) {
      let logValue = value / props.max;
      logValue = Math.pow(logValue, 1 / props.logSlider);
      logValue *= props.max;
      set_value(logValue);
    } else {
      set_value(value);
    }
  }, []);

  useEffect(() => {
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      if (props.logSlider !== undefined) {
        let logValue = _value / props.max;
        logValue = Math.pow(logValue, props.logSlider);
        logValue *= props.max;
        handleChange.call(props, logValue);
      }
      else {
        handleChange.call(props, _value);
      }
    }, 200);
  }, [_value]);

  let displayValue = formatNumber(props.selectedValue, 2, {
    usePercent: props.displayAsPercent,
    onlySignificant: true,
  });

  const attributes = deepClone(props.sliderAttributes);
  if (attributes.marks === 'auto') {
    attributes.marks = {};
    for (let i = 0; i <= 8; i++) {
      let val = i * props.max / 8;
      let logVal = val;
      if (props.logSlider !== undefined) {
        logVal /= props.max;
        logVal = Math.pow(logVal, props.logSlider);
        logVal *= props.max;

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

      attributes.marks[val] = formatNumber(
        logVal,
        2,
        {
          usePercent: props.displayAsPercent,
          onlySignificant: true,
        }
      );
    }
  }

  return (
    <div className="SliderControls option-controls">
      <div className="slider-value">{displayValue}</div>
      {props.useTooltips ? <SliderWithTooltip
        {...attributes}
        min={props.min}
        max={props.max}
        value={_value}
        tipFormatter={() => displayValue}
        onChange={value => set_value(value)}
      /> : <Slider
        {...attributes}
        min={props.min}
        max={props.max}
        value={_value}
        onChange={value => set_value(value)}
      />}
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
    useTooltips: option.useTooltips,
    logSlider: option.logSlider,
    displayAsPercent: option.displayAsPercent,
  };
})(SliderControls);
