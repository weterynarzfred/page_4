import React from 'react';
import { optionTypes } from 'Include/enum';
import GroupControls from '../controls/GroupControls';
import InstancerControls from '../controls/InstancerControls';
import IntegerControls from '../controls/IntegerControls';
import SelectControls from '../controls/SelectControls';
import TextControls from '../controls/TextControls';

function OptionControls(props) {
  let controls;
  switch (props.option.type) {
    case optionTypes.INTEGER:
      controls = <>
        <IntegerControls option={props.option} />
        <GroupControls options={props.option.options} currencies={props.currencies} />
      </>;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={props.option} currencies={props.currencies} />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls option={props.option} currencies={props.currencies} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls options={props.option.options} currencies={props.currencies} />;
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
