import React from 'react';
import { connect } from 'react-redux';
import { deepEquals } from '../functions/deepFunctions';
import { getSelectedValue } from '../functions/getSelectedValue';
import { optionTypes } from '../include/constants';
import SummaryItem from './SummaryItem';

function SummaryList(props) {
  if (props.optionKeys === undefined || props.optionKeys.length === 0) return null;

  const items = [];
  for (const optionKey of props.optionKeys) {
    items.push(<SummaryItem
      key={optionKey}
      optionKey={optionKey}
      onClick={props.onClick}
    />);
  }

  if (props.skipListWrap) return items;

  return (
    <>
      {props.optionKey === undefined ? null : <svg
        className="summary-item-close"
        viewBox="0 0 100 100"
        onClick={props.setOpened}
      >
        <path d="M10 30L50 70L90 30" />
      </svg>}
      {(props.opened || props.optionKey === undefined) ? <ul className="SummaryList">
        {items}
      </ul> : null}
    </>
  );
}

export default connect((state, props) => {
  let optionKeys;

  if (props.optionKey === undefined) {
    optionKeys = Object.keys(state.options).filter(
      key => key.match('/') === null
    );
  } else {
    const option = state.options[props.optionKey];
    if (
      option.type === optionTypes.GROUP ||
      option.type === optionTypes.SLIDER ||
      option.type === optionTypes.INTEGER
    ) {
      optionKeys = option.options;
    }
    else if (
      option.type === optionTypes.SELECT ||
      option.type === optionTypes.RATIO
    ) {
      optionKeys = option.choices;
    }
    else if (option.type === optionTypes.INSTANCER) {
      optionKeys = getSelectedValue(option, state.options);
    }
  }

  return {
    optionKeys,
  };
}, null, null, {
  areStatePropsEqual: deepEquals,
})(SummaryList);
