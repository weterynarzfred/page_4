import React, { cloneElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import { actions } from 'Include/enum';
import getSelectedValue from 'Functions/getSelectedValue';
import OptionCost from 'Components/optionElements/OptionCost';
import OptionImage from 'Components/optionElements/OptionImage';
import CheckboxControl from './CheckboxControl';
import GroupControls from './GroupControls';
import OptionRequirements from '../optionElements/OptionRequirements';

function handleToggle(selected) {
  const args = {
    type: actions.SELECT_OPTION,
    option: this.option,
  };
  if (!selected) args.add = this.slug;
  else args.subtract = this.slug;
  this.dispatch(args);
}

function SelectChoice(props) {
  const value = getSelectedValue(props.option, props.options);
  const selected = value.includes(props.slug);

  const currencies = _.cloneDeep(props.currencies);
  if (props.choice.currencies !== undefined) {
    Object.assign(currencies, _.cloneDeep(props.choice.currencies));
  }

  return (
    <div className={classNames('SelectChoice', 'option-is-selectable', { selected })}>
      <div className="option-content">
        <div className="option-title">{props.choice.title}</div>
        <OptionCost cost={props.choice.cost} currencies={props.currencies} />
        <OptionImage image={props.choice.image} />
        <div className="option-text">{props.choice.text === undefined ? '' : cloneElement(props.choice.text)}</div>
        <CheckboxControl
          selected={selected}
          handleToggle={handleToggle.bind(props, selected)}
        />
        <OptionRequirements option={props.choice} />
        <GroupControls options={props.choice.options} currencies={currencies} />
      </div>
    </div>
  );
}

export default connect(state => ({ options: state.options }))(SelectChoice);