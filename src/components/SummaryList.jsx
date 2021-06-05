import React from 'react';
import { connect } from 'react-redux';
import { deepEquals } from '../functions/deepFunctions';
import { getSelectedValue, isSelected } from '../functions/getSelectedValue';
import isDisabled from '../functions/isDisabled';
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
      {props.opened === undefined ? null : <svg
        className="summary-item-close"
        viewBox="0 0 100 100"
        onClick={props.setOpened}
      >
        <path d="M10 30L50 70L90 30" />
      </svg>}
      {(props.opened === undefined || props.opened) ?
        <ul className="SummaryList">{items}</ul> : null}
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
    switch (option.type) {
      case optionTypes.GROUP:
      case optionTypes.SLIDER:
      case optionTypes.INTEGER:
        optionKeys = option.options;
        break;
      case optionTypes.SELECT:
      case optionTypes.RATIO:
        optionKeys = option.choices;
        break;
      case optionTypes.INSTANCER:
        optionKeys = getSelectedValue(option, state.options);
    }
  }

  if (optionKeys === undefined) return {};

  optionKeys = optionKeys.filter(
    key => {
      const suboption = state.options[key];
      return !(suboption.type === optionTypes.TEXT ||
        suboption.hidden ||
        suboption.hiddenInSummary ||
        isDisabled(suboption) ||
        (key.match('/') !== null && !isSelected(suboption, state.options)));
    }
  );

  return {
    optionKeys,
  };
}, null, null, {
  areStatePropsEqual: deepEquals,
})(SummaryList);
