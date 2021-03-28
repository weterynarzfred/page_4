import React from 'react';
import { optionTypes } from 'Include/enum';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import SelectControls from '../controls/SelectControls';
import TextControls from '../controls/TextControls';

function OptionControls(props) {
  let useMasonry = false;
  if (
    props.option.type === optionTypes.GROUP &&
    props.option.options !== undefined
  ) {
    useMasonry = true;
    for (const slug in props.option.options) {
      const option = props.option.options[slug];
      if (![optionTypes.INTEGER, optionTypes.TEXT].includes(option.type)) {
        useMasonry = false;
        break;
      }
    }
  }

  let controls;
  switch (props.option.type) {
    case optionTypes.INTEGER:
      controls = <>
        <IntegerControls option={props.option} />
        <GroupControls
          option={props.option}
          options={props.option.options}
          useMasonry={useMasonry}
          currencies={props.currencies}
        />
      </>;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls
        option={props.option}
        useMasonry={useMasonry}
        currencies={props.currencies}
      />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls
        option={props.option}
        currencies={props.currencies}
      />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls
        option={props.option}
        options={props.option.options}
        useMasonry={useMasonry}
        currencies={props.currencies}
      />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls option={props.option} />;
      break;
    default:
      controls = null;
  }

  return controls;
}

export default OptionControls;
