import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import formatNumber from '../functions/formatNumber';
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

  const [opened, setOpened] = useState(false);

  const showList = [
    optionTypes.GROUP,
    optionTypes.INSTANCER
  ].includes(props.type);

  let value = props.value;
  if (Array.isArray(value)) {
    if (props.type === optionTypes.RATIO) {
      value = value.map((item, index) => (
        <span key={item.optionKey}>
          {index === 0 ? '' : ', '}{item.title}:
          {formatNumber(item.percentage, 1, {
            usePercent: true,
            showSignificant: true
          })}
        </span>
      ));
    } else {
      value = value.map((optionKey, index) => (
        <span key={optionKey}>
          {index === 0 ? '' : ', '}{getUserValue(optionKey, 'title')}
        </span>
      ));
    }
  }

  const content = <>
    <div className="summary-item-title">
      <PathLink
        path={props.optionKey}
        onClick={props.onClick}
      >{props.title}</PathLink>
      <div className="summary-title-value">{value}</div>
    </div>
    {showList ? <SummaryList
      optionKey={props.optionKey}
      onClick={props.onClick}
      skipListWrap={props.title === ''}
      opened={opened}
      setOpened={() => setOpened(!opened)}
    /> : null}
  </>;

  if (props.title === '') return content;

  return (
    <li className={classNames('SummaryItem', { opened })}>
      {content}
    </li>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (
    option.type === optionTypes.TEXT ||
    option.hidden ||
    isDisabled(option) ||
    (props.optionKey.match('/') !== null && !isSelected(option, state.options))
  ) return {};

  let value = '';
  if ([optionTypes.INTEGER, optionTypes.SLIDER, optionTypes.SELECT].includes(option.type)) {
    value = getSelectedValue(option, state.options);
  }
  if ([optionTypes.RATIO].includes(option.type)) {
    value = getSelectedValue(option, state.options);
  }

  return {
    title: getUserValue(props.optionKey, 'title'),
    type: option.type,
    value,
  };
})(SummaryItem);
