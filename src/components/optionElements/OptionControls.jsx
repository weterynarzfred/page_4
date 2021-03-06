import React from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../../include/constants';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import TextControls from '../controls/TextControls';
import SliderControls from '../controls/SliderControls';
import RatioControls from '../controls/RatioControls';

function OptionControls(props) {

  switch (props.type) {
    case optionTypes.INTEGER:
      return <>
        <IntegerControls
          optionKey={props.optionKey}
          topLevel={props.topLevel}
        />
        <GroupControls optionKey={props.optionKey} topLevel={props.topLevel} />
      </>;
    case optionTypes.INSTANCER:
      return <>
        <InstancerControls optionKey={props.optionKey} />
        <GroupControls
          optionKey={props.optionKey}
          topLevel={props.topLevel}
          useMasonry={props.useMasonry}
        />
      </>;
    case optionTypes.RATIO:
      return <>
        <RatioControls optionKey={props.optionKey} />
        <GroupControls
          optionKey={props.optionKey}
          topLevel={props.topLevel}
          useMasonry={props.useMasonry}
        />
      </>;
    case optionTypes.SELECT:
    case optionTypes.GROUP:
      return <GroupControls
        optionKey={props.optionKey}
        topLevel={props.topLevel}
        useMasonry={props.useMasonry}
      />;
    case optionTypes.TEXT:
      return <TextControls optionKey={props.optionKey} />;
    case optionTypes.SLIDER:
      return <>
        <SliderControls optionKey={props.optionKey} />
        <GroupControls optionKey={props.optionKey} topLevel={props.topLevel} />
      </>;
    default:
      return null;
  }
}

function checkIfMasonry(option, options) {
  let subOptions;
  if (option.type === optionTypes.GROUP || option.type === optionTypes.INSTANCER) {
    subOptions = option.options;
  }
  else if (option.type === optionTypes.SELECT) {
    if (option.displayAsTable) return false;
    subOptions = option.choices;
  }
  else if (option.type === optionTypes.RATIO) {
    subOptions = option.choices;
  }
  if (subOptions === undefined) return false;
  if (subOptions.lenght === 0) return false;

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
