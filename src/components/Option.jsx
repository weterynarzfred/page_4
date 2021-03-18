import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { optionTypes } from '../include/enum';
import GroupControls from './GroupControls';
import InstancerControls from './InstancerControls';
import IntegerControls from './IntegerControls';
import OptionCost from './OptionCost';
import SelectControls from './SelectControls';
import Stats from './Stats';
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

  const requirements = [];
  if (option.requirements !== undefined) {
    let index = 0;
    for (const test of option.requirements) {
      requirements.push(<div className={classNames('requirement', { met: test.value })} key={index}>
        {test.text}
      </div>);
      index++;
    }
  }

  return (
    <div className={classNames('Option', `option-${option.type}`, { selected })}>
      <div className="option-content">
        <div className="option-title">{option.title}</div>
        <OptionCost option={option} />
        {image}
        <Stats currencies={option.currencies} />
        <div className="option-text">{option.text}</div>
        {controls}
        {requirements.length > 0 ? <div className="option-requirements">{requirements}</div> : null}
      </div>
    </div>
  );
}

export default connect(state => ({
  selected: state.selected,
}))(Option);