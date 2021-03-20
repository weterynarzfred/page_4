import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../include/enum';
import getSelected from '../functions/getSelected';
import OptionCost from './OptionCost';
import classNames from 'classnames';
import CheckboxControl from './CheckboxControl';

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
  const value = getSelected(props.option, props.selected);
  const selected = value.includes(props.slug);

  return (
    <div className={classNames('SelectChoice', 'option-is-selectable', { selected })}>
      <div className="option-content">
        <div className="option-title">{props.choice.title}</div>
        <OptionCost cost={props.choice.cost} currencies={props.currencies} />
        <CheckboxControl selected={selected} handleToggle={handleToggle.bind(props, selected)} />
      </div>
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(SelectChoice);