import React from 'react';
import { optionTypes } from 'Include/constants';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import SelectControls from '../controls/SelectControls';
import TextControls from '../controls/TextControls';
import SliderControls from '../controls/SliderControls';
import { connect } from 'react-redux';

function checkIfMasonry(option, options) {
  let subOptions;
  if (option.type === optionTypes.GROUP) subOptions = option.subOptions;
  if (option.type === optionTypes.SELECT) {
    if (option.displayAsTable) return false;
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


function OptionControls(props) {

  let controls;
  switch (props.type) {
    case optionTypes.INTEGER:
      //     controls = <>
      //       <IntegerControls option={props.option} />
      //       <GroupControls
      //         option={props.option}
      //         options={props.option.options}
      //         useMasonry={useMasonry}
      //         currencies={props.currencies}
      //       />
      //     </>;
      controls = <IntegerControls optionKey={props.optionKey} />;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls
        optionKey={props.optionKey}
        useMasonry={props.useMasonry}
      />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls optionKey={props.optionKey} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls
        optionKey={props.optionKey}
        useMasonry={props.useMasonry}
      />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls optionKey={props.optionKey} />;
      break;
    //   case optionTypes.SLIDER:
    //     controls = <SliderControls option={props.option} />;
    //     break;
    default:
      controls = null;
  }

  return controls;

}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    type: option.type,
    useMasonry: checkIfMasonry(option, state.options),
  };
})(OptionControls);
