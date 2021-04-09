import React, { useState } from 'react';
import { connect } from 'react-redux';
import { optionTypes } from 'Include/constants';
import PathLink from './PathLink';
import { getSelectedValue } from '../functions/getSelectedValue';
import { getUserText } from '../include/userTexts';

function findWarnings(options, allOptions = options) {
  const warnings = [];

  for (const slug in options) {
    const option = options[slug];
    if (option.disabled) continue;

    const selectedCount = getSelectedCount(option, allOptions);
    if (option.requirements !== undefined) {
      if (option.type === optionTypes.INTEGER || option.type === optionTypes.SELECT) {
        if (selectedCount > 0) {
          let index = 0;
          for (const test of option.requirements) {
            if (!test.value) {
              warnings.push({
                id: option.path.join('/') + '-' + index,
                path: option.path,
                text: <>{getProp('title', option)} &ndash; {getUserText([...option.path, `requirement-${index}`])}</>,
              });
            }
            index++;
          }
        }
      }
    }
    if ([optionTypes.INTEGER, optionTypes.SELECT].includes(option.type)) {
      if (selectedCount < option.min) {
        warnings.push({
          id: option.path.join('/') + '-lessThanMin',
          path: option.path,
          text: `${getProp('title', option)} cannot have less than ${option.min} selected.`,
        });
      }
      if (selectedCount > option.max) {
        warnings.push({
          id: option.path.join('/') + '-moreThanMax',
          path: option.path,
          text: `${getProp('title', option)} cannot have more than ${option.max} selected.`,
        });
      }
    }

    if (option.options !== undefined) {
      warnings.push(...findWarnings(option.options, allOptions));
    }

    if (option.type === optionTypes.SELECT) {
      warnings.push(...findWarnings(option.choices, allOptions));
    }

    if (option.type === optionTypes.INSTANCER) {
      warnings.push(
        ...findWarnings(getSelectedValue(option, allOptions), allOptions)
      );
    }
  }

  return warnings;
}

function Warnings(props) {
  const [opened, setOpened] = useState(false);

  const warningElements = [];
  const warnings = findWarnings(props.options);
  for (const warning of warnings) {
    const parentPath = warning.path.length > 1 ?
      warning.path.slice(0, -1) :
      warning.path;
    warningElements.push(<div className="warning" key={warning.id}>
      <div className="warning-path">
        <PathLink path={parentPath.join('/')} onClick={() => setOpened(false)}>
          {parentPath.join('/')}
        </PathLink>
      </div>
      <div className="warning-text">{warning.text}</div>
    </div>);
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

export default connect(state => ({
  options: state.options,
  currencies: state.currencies,
}))(Warnings);