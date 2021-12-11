import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import formatNumber from '../functions/formatNumber';
import { getSelectedValue } from '../functions/getSelectedValue';
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
    } else if (props.type === optionTypes.SELECT) {
      value = value.map((item, index) => (
        <span key={item.optionKey}>
          {index === 0 ? '' : ', '}{getUserValue(item.optionKey, 'title')}
          {item.selected === 1 ? '' : ' × ' + formatNumber(item.selected, 1, {
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
        className={classNames({ linkCurrent: props.isCurrent })}
      >{props.title}</PathLink>
      <div className="summary-title-value">{value}</div>
    </div>
    {showList ? <SummaryList
      optionKey={props.optionKey}
      onClick={props.onClick}
      skipListWrap={props.title === ''}
      opened={opened}
      setOpened={() => setOpened(!opened)}
      hideSelectable={props.hideSelectable}
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

  let value = '';
  if (optionTypes.SELECT === option.type) {
    value = getSelectedValue(option, state.options).map(optionKey => ({
      optionKey,
      selected: getSelectedValue(state.options[optionKey], state.options),
    }));
  }
  if ([optionTypes.INTEGER, optionTypes.SLIDER].includes(option.type)) {
    value = getSelectedValue(option, state.options);
  }
  if (optionTypes.RATIO === option.type) {
    value = getSelectedValue(option, state.options);
  }

  return {
    title: getUserValue(props.optionKey, 'title'),
    type: option.type,
    value,
    isCurrent: state.path.join('/').startsWith(props.optionKey),
  };
})(SummaryItem);
