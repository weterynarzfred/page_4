import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../include/enum';
import GroupControls from './GroupControls';
import InstancerControls from './InstancerControls';
import IntegerControls from './IntegerControls';
import SelectControls from './SelectControls';
import Stats from './Stats';
import TextControls from './TextControls';

function Option(props) {
  let option = props.option;

  let controls;
  switch (option.type) {
    case optionTypes.INTEGER:
      controls = <IntegerControls option={option} />;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={option} />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls option={option} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls option={option} />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls option={option} />;
      break;
    default:
      controls = null;
  }

  return (
    <div className={classNames('Option', `option-${option.type}`)}>
      <div className="option-title">{option.title}</div>
      <Stats currencies={option.currencies} />
      {controls}
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(Option);