import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import getSelected from '../functions/getSelected';
import { optionTypes } from '../include/enum';
import GroupControls from './GroupControls';
import InstancerControls from './InstancerControls';
import IntegerControls from './IntegerControls';
import OptionCost from './OptionCost';
import OptionRequirements from './OptionRequirements';
import SelectControls from './SelectControls';
import Currencies from './Currencies';
import TextControls from './TextControls';

function Option(props) {
  let option = props.option;

  let controls;
  let selected = false;
  switch (option.type) {
    case optionTypes.INTEGER:
      controls = <IntegerControls option={option} />;
      selected = getSelected(option, props.selected) > 0;
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
      selected = getSelected(option, props.selected).length > 0;
      break;
    default:
      controls = null;
  }

  const image = option.image !== undefined ? <div className="option-image">
    <div
      className="option-image-content"
      style={{ backgroundImage: `url(./images/${option.image})` }}
    ></div>
  </div> : null;

  return (
    <div className={classNames(
      'Option',
      `option-${option.type}`,
      { selected },
      {
        'option-is-selectable': [
          optionTypes.INTEGER,
          optionTypes.TEXT,
        ].includes(option.type)
      },
      {
        'option-is-container': [
          optionTypes.GROUP,
          optionTypes.INSTANCER,
        ].includes(option.type)
      }
    )}>
      <div className="option-content">
        <div className="option-title">{option.title}</div>
        <OptionCost option={option} />
        {image}
        <Currencies currencies={option.currencies} />
        <div className="option-text">{option.text}</div>
        {controls}
        <OptionRequirements option={option} />
      </div>
    </div>
  );
}

export default connect(state => ({
  selected: state.selected,
}))(Option);