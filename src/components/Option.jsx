import React from 'react';
import { optionTypes } from '../include/enum';
import GroupControls from './GroupControls';
import InstancerControls from './InstancerControls';
import IntegerControls from './IntegerControls';
import SelectControls from './SelectControls';
import TextControls from './TextControls';

function Option(props) {
  let controls;
  switch (props.option.type) {
    case optionTypes.INTEGER:
      controls = <IntegerControls option={props.option} />;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={props.option} />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls option={props.option} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls option={props.option} />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls option={props.option} />;
      break;
    default:
      controls = null;
  }

  return (
    <div className="Option">
      <div className="option-title">{props.option.title}</div>
      {controls}
    </div>
  );
}

export default Option;