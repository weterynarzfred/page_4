import React, { cloneElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import isSelected from 'Functions/isSelected';
import Currencies from './Currencies';
import OptionRequirements from './optionElements/OptionRequirements';
import OptionImage from './optionElements/OptionImage';
import OptionCost from './optionElements/OptionCost';
import GroupControls from './controls/GroupControls';
import InstancerControls from './controls/InstancerControls';
import IntegerControls from './controls/IntegerControls';
import SelectControls from './controls/SelectControls';
import TextControls from './controls/TextControls';

function Option(props) {
  const currencies = _.cloneDeep(props.currencies);
  if (props.option.currencies !== undefined) {
    Object.assign(currencies, _.cloneDeep(props.option.currencies));
  }

  let controls;
  let selected = isSelected(props.option, props.options);
  switch (props.option.type) {
    case optionTypes.INTEGER:
      controls = <>
        <IntegerControls option={props.option} />
        <GroupControls options={props.option.options} currencies={currencies} />
      </>;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={props.option} currencies={currencies} />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls option={props.option} currencies={currencies} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls options={props.option.options} currencies={currencies} />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls option={props.option} />;
      break;
    default:
      controls = null;
  }

  return (
    <div className={classNames(
      'Option',
      `option-${props.option.type}`,
      { selected },
      {
        'option-is-selectable': [
          optionTypes.INTEGER,
          optionTypes.TEXT,
        ].includes(props.option.type)
      },
      {
        'option-is-container': [
          optionTypes.GROUP,
          optionTypes.SELECT,
          optionTypes.INSTANCER,
        ].includes(props.option.type)
      }
    )}>
      <div className="option-content">
        <div className="option-title">{props.option.title}</div>
        <OptionCost cost={props.option.cost} currencies={currencies} />
        <OptionImage image={props.option.image} />
        <Currencies currencies={props.option.currencies} />
        <div className="option-text">{props.option.text === undefined ? '' : cloneElement(props.option.text)}</div>
        {controls}
        <OptionRequirements option={props.option} />
      </div>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(Option);