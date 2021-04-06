import React from 'react';
import { optionTypes } from 'Include/constants';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import SelectControls from '../controls/SelectControls';
import TextControls from '../controls/TextControls';
import SliderControls from '../controls/SliderControls';
import { connect } from 'react-redux';

// function checkIfMasonry(option) {
//   if (option.type !== optionTypes.GROUP || option.options === undefined) {
//     return false;
//   }

//   for (const slug in option.options) {
//     const type = option.options[slug].type;
//     if (![
//       optionTypes.INTEGER,
//       optionTypes.TEXT,
//       optionTypes.SLIDER,
//     ].includes(type)) return false;
//   }
//   return true;
// }


function OptionControls(props) {
  // const useMasonry = checkIfMasonry(props.option);

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
      //     controls = <SelectControls
      //       option={props.option}
      //       useMasonry={useMasonry}
      //       currencies={props.currencies}
      //     />;
      controls = <SelectControls optionKey={props.optionKey} />;
      break;
    case optionTypes.INSTANCER:
      //     controls = <InstancerControls
      //       option={props.option}
      //       currencies={props.currencies}
      //     />;
      controls = <InstancerControls optionKey={props.optionKey} />;
      break;
    case optionTypes.GROUP:
      //     controls = <GroupControls
      //       option={props.option}
      //       options={props.option.options}
      //       useMasonry={useMasonry}
      //       currencies={props.currencies}
      //     />;
      controls = <GroupControls optionKey={props.optionKey} />;
      break;
    //   case optionTypes.TEXT:
    //     controls = <TextControls option={props.option} />;
    //     break;
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
  };
})(OptionControls);
