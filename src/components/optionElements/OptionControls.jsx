import React from 'react';
import { optionTypes } from 'Include/constants';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import TextControls from '../controls/TextControls';
import SliderControls from '../controls/SliderControls';
import RatioControls from '../controls/RatioControls';
import { connect } from 'react-redux';

function OptionControls(props) {

  let controls;
  switch (props.type) {
    case optionTypes.INTEGER:
      controls = <>
        <IntegerControls optionKey={props.optionKey} />
        <GroupControls optionKey={props.optionKey} />
      </>;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls optionKey={props.optionKey} />;
      break;
    case optionTypes.RATIO:
      controls = <>
        <RatioControls optionKey={props.optionKey} />
        <GroupControls
          optionKey={props.optionKey}
          useMasonry={props.useMasonry}
        />
      </>;
      break;
    case optionTypes.SELECT:
    case optionTypes.GROUP:
      controls = <GroupControls
        optionKey={props.optionKey}
        useMasonry={props.useMasonry}
      />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls optionKey={props.optionKey} />;
      break;
    case optionTypes.SLIDER:
      controls = <>
        <SliderControls optionKey={props.optionKey} />
        <GroupControls optionKey={props.optionKey} />
      </>;
      break;
    default:
      controls = null;
  }

  return controls;
}

function checkIfMasonry(option, options) {
  let subOptions;
  if (option.type === optionTypes.GROUP) subOptions = option.subOptions;
  else if (option.type === optionTypes.SELECT) {
    if (option.displayAsTable || option.isSelectablesChild) return false;
    subOptions = option.choices;
  }
  else if (option.type === optionTypes.RATIO) {
    subOptions = option.choices;
  }
  if (subOptions === undefined) return false;

  for (const optionKey of subOptions) {
    if (![
      optionTypes.INTEGER,
      optionTypes.TEXT,
      optionTypes.SLIDER,
    ].includes(options[optionKey].type)) return false;
  }
  return true;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    type: option.type,
    useMasonry: checkIfMasonry(option, state.options),
  };
})(OptionControls);
