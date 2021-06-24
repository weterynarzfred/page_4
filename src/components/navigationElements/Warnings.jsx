import React, { useState } from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../../include/constants';
import PathLink from '../PathLink';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { getUserValue } from '../../include/userValues';
import isDisabled from '../../functions/isDisabled';

function findWarnings(state) {
  const warnings = [];

  for (const optionKey in state.options) {
    const option = state.options[optionKey];
    if (isDisabled(option)) continue;

    const value = getSelectedValue(option, state.options);
    const selectedCount = Array.isArray(value) ? value.length : value;
    if ([optionTypes.INTEGER, optionTypes.SELECT].includes(option.type)) {
      if (selectedCount < option.min) {
        warnings.push({
          id: option.optionKey + '.lessThanMin',
          optionKey: option.optionKey,
          text: `${getUserValue(optionKey, 'title')} cannot have less than ${option.min} selected.`,
        });
      }
      if (selectedCount > option.max) {
        warnings.push({
          id: option.optionKey + '.moreThanMax',
          optionKey: option.optionKey,
          text: `${getUserValue(optionKey, 'title')} cannot have more than ${option.max} selected.`,
        });
      }
    }
  }

  return warnings;
}

function Warnings(props) {
  const [opened, setOpened] = useState(false);

  const warningElements = [];
  for (const warning of props.warnings) {

    warningElements.push(
      <div className="warning" key={warning.id}>
        <div className="warning-path">
          <PathLink path={warning.optionKey} onClick={() => setOpened(false)}>
            {warning.optionKey}
          </PathLink>
        </div>
        <div className="warning-text">{warning.text}</div>
      </div>
    );
  }

  if (warningElements.length === 0) return null;

  return (
    <div className="Warnings">
      <div className="warning-icon" onClick={() => setOpened(!opened)}>+</div>
      {opened ? <div className="warning-list">
        {warningElements}
      </div> : null}
    </div>
  );
}

export default connect(state => {
  const warnings = findWarnings(state);
  return {
    warnings,
  };
})(Warnings);
