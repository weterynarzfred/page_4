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
  if (
    props.option.type === optionTypes.GROUP ||
    props.option.type === optionTypes.INTEGER
  ) {
    list = <SummaryList
      options={props.option.options}
      onClick={props.onClick}
    />;
  }
  else if (props.option.type === optionTypes.SELECT) {
    list = <SummaryList
      options={props.option.choices}
      onClick={props.onClick}
    />;
  }
  else if (props.option.type === optionTypes.INSTANCER) {
    list = <SummaryList
      options={value}
      onClick={props.onClick}
    />;
  }

  return (
    <li className="SummaryItem">
      <span className="summary-item-title">
        <PathLink
          path={props.option.path.join('.')}
          onClick={props.onClick}
        >{props.option.title}</PathLink>
      </span>
      {list}
    </li>
  );
}

export default connect(state => ({
  options: state.options,
}))(SummaryItem);