import React from 'react';
import { connect } from 'react-redux';
import getSelectedValue from '../functions/getSelectedValue';
import isSelected from '../functions/isSelected';
import { optionTypes } from '../include/enum';
import PathLink from './PathLink';
import SummaryList from './SummaryList';

function SummaryItem(props) {
  if (!isSelected(props.option, props.options)) return null;

  const value = getSelectedValue(props.option, props.options);

  let list = null;
  if (props.option.type === optionTypes.GROUP) {
    list = <SummaryList options={props.option.options} />;
  }
  else if (props.option.type === optionTypes.INTEGER) {
    list = <SummaryList options={props.option.options} />;
  }
  else if (props.option.type === optionTypes.SELECT) {
    list = <SummaryList options={props.option.choices} />;
  }
  else if (props.option.type === optionTypes.INSTANCER) {
    list = <SummaryList options={value} />;
  }

  return (
    <li className="SummaryItem">
      <span className="summary-item-title">
        <PathLink path={props.option.path.join('.')}>{props.option.title}</PathLink>
      </span>
      {list}
    </li>
  );
}

export default connect(state => ({
  options: state.options,
}))(SummaryItem);