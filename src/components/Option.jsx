import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import { getUserText } from 'Include/userTexts';
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
  let option = props.option;

  const currencies = _.cloneDeep(props.currencies);
  if (option.currencies !== undefined) {
    Object.assign(currencies, _.cloneDeep(option.currencies));
  }

  let controls;
  let selected = isSelected(option, props.options);
  switch (option.type) {
    case optionTypes.INTEGER:
      controls = <>
        <IntegerControls option={option} />
        <GroupControls options={option.options} currencies={currencies} />
      </>;
      break;
    case optionTypes.SELECT:
      controls = <SelectControls option={option} currencies={currencies} />;
      break;
    case optionTypes.INSTANCER:
      controls = <InstancerControls option={option} currencies={currencies} />;
      break;
    case optionTypes.GROUP:
      controls = <GroupControls options={option.options} currencies={currencies} />;
      break;
    case optionTypes.TEXT:
      controls = <TextControls option={option} />;
      break;
    default:
      controls = null;
  }

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
          optionTypes.SELECT,
          optionTypes.INSTANCER,
        ].includes(option.type)
      }
    )}>
      <div className="option-content">
        <div className="option-title">{option.title}</div>
        <OptionCost cost={option.cost} currencies={currencies} />
        <OptionImage image={option.image} />
        <Currencies currencies={option.currencies} />
        <div className="option-text">{getUserText(option.text)}</div>
        {controls}
        <OptionRequirements option={option} />
      </div>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(Option);