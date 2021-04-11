import React from 'react';
import { connect } from 'react-redux';
import { getSelectedValue, isSelected } from '../functions/getSelectedValue';
import isDisabled from '../functions/isDisabled';
import { optionTypes } from '../include/constants';
import { getUserValue } from '../include/userValues';
import PathLink from './PathLink';
import SummaryList from './SummaryList';

function SummaryItem(props) {
  if (
    props.optionKey === undefined ||
    props.title === undefined
  ) return null;



  const content = <>
    <div className="summary-item-title">
      <PathLink
        path={props.optionKey}
        onClick={props.onClick}
      >{props.title}</PathLink>
    </div>
    <SummaryList
      optionKey={props.optionKey}
      onClick={props.onClick}
      skipListWrap={props.title === ''}
    />
  </>;

  if (props.title === '') return content;

  return (
    <li className="SummaryItem">
      {content}
    </li>
  );
}

export default connect((state, props) => {
  if (
    state.options[props.optionKey].hidden ||
    isDisabled(state.options[props.optionKey])
  ) return {};
  return {
    title: getUserValue(props.optionKey, 'title'),
  };
})(SummaryItem);
