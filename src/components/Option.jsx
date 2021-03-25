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
import OptionControls from './optionElements/OptionControls';

function Option(props) {
  const currencies = _.cloneDeep(props.currencies);
  if (props.option.currencies !== undefined) {
    Object.assign(currencies, _.cloneDeep(props.option.currencies));
  }

  let selected = isSelected(props.option, props.options);

  return (
    <div className={classNames(
      'Option',
      `option-${props.option.type}`,
      { selected },
      { 'top-level': props.topLevel },
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
        {props.topLevel ? null : <Currencies currencies={props.option.currencies} />}
        <div className="option-text">{props.option.text === undefined ? '' : cloneElement(props.option.text)}</div>
        <OptionControls option={props.option} currencies={currencies} />
        <OptionRequirements option={props.option} />
      </div>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(Option);