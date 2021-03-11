import React from 'react';
import { optionTypes } from '../include/enum';
import IntegerControls from './IntegerControls';
import SelectControls from './SelectControls';

function Option(props) {
  let controls;
  switch (props.option.type) {
    case optionTypes.INTEGER:
      controls = <IntegerControls option={props.option} />;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={props.option} />;
      break;
    default:
      controls = null;
  }

  return (
    <div className="Option">
      {props.option.title}
      {controls}
    </div>
  );
}

export default Option;