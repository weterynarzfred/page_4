import React from 'react';
import { connect } from 'react-redux';
import getProp from '../functions/getProp';
import { getSelectedValue, isSelected } from '../functions/getSelectedValue';
import { optionTypes } from '../include/enum';
import PathLink from './PathLink';
import SummaryList from './SummaryList';

function SummaryItem(props) {
  if (
    props.option.hidden ||
    !isSelected(props.option, props.options)
  ) return null;

  let suboptions = {};
  if (
    props.option.type === optionTypes.GROUP ||
    props.option.type === optionTypes.INTEGER
  ) {
    suboptions = props.option.options;
  }
  else if (props.option.type === optionTypes.SELECT) {
    suboptions = props.option.choices;
  }
  else if (props.option.type === optionTypes.INSTANCER) {
    suboptions = getSelectedValue(props.option, props.options);
  }

  return (
    <li className="SummaryItem">
      <span className="summary-item-title">
        <PathLink
          path={props.option.path.join('.')}
          onClick={props.onClick}
        >{getProp('title', props.option)}</PathLink>
      </span>
      <SummaryList
        options={suboptions}
        onClick={props.onClick}
      />
    </li>
  );
}

export default connect(state => ({
  options: state.options,
}))(SummaryItem);