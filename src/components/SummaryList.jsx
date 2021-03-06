import React from 'react';
import { connect } from 'react-redux';
import { deepEquals } from '../functions/deepFunctions';
import { getSelectedValue, isSelected } from '../functions/getSelectedValue';
import isDisabled from '../functions/isDisabled';
import { optionTypes } from '../include/constants';
import { getUserValue } from '../include/userValues';
import SummaryItem from './SummaryItem';

function SummaryList(props) {
  if (props.optionKeys === undefined || props.optionKeys.length === 0) return null;

  const items = [];
  for (const optionKey of props.optionKeys) {
    items.push(<SummaryItem
      key={optionKey}
      optionKey={optionKey}
      onClick={props.onClick}
      hideSelectable={props.hideSelectable}
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

function isRootOption(option) {
  return option.optionKey.match('/') === null;
}

function shouldShowOption(option, hideSelectable, options) {
  if (
    option.type === optionTypes.TEXT ||
    option.hidden ||
    getUserValue(option.optionKey, 'hiddenInSummary') ||
    isDisabled(option) ||
    (
      !isRootOption(option) &&
      !isSelected(option, options)
    )
  ) return false;

  if (hideSelectable) {
    if ([
      optionTypes.INTEGER,
      optionTypes.SLIDER,
      optionTypes.SELECT,
      optionTypes.RATIO,
    ].includes(option.type)) return false;

    if (
      option.type === optionTypes.GROUP &&
      !isRootOption(option) &&
      !option.isInstance &&
      !option.hiddenInParent
    ) return false;
  }

  return true;
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
      return shouldShowOption(suboption, props.hideSelectable, state.options);
    }
  );

  return {
    optionKeys,
  };
}, null, null, {
  areStatePropsEqual: deepEquals,
})(SummaryList);
