import React, { useState } from 'react';
import { connect } from 'react-redux';
import { optionTypes } from 'Include/enum';
import getSelectedValue from 'Functions/getSelectedValue';

function findWarnings(options, allOptions = options) {
  const warnings = [];

  for (const slug in options) {
    const option = options[slug];
    if (option.requirements !== undefined) {
      if (option.type === optionTypes.INTEGER) {
        const selected = getSelectedValue(option, allOptions);
        if (selected > 0) {
          for (const test of option.requirements) {
            if (!test.value) {
              warnings.push({
                path: option.path,
                text: test.text,
              });
            }
          }
        }
      }
    }

    if (option.options !== undefined) {
      warnings.push(...findWarnings(option.options, allOptions));
    }

    if (option.type === optionTypes.SELECT) {
      warnings.push(...findWarnings(option.choices, allOptions));
    }

    if (option.type === optionTypes.INSTANCER) {
      warnings.push(...findWarnings(option.selected, allOptions));
    }
  }

  return warnings;
}

function Warnings(props) {
  const [opened, setOpened] = useState(false);

  const warningElements = [];
  const warnings = findWarnings(props.options);
  for (const warning of warnings) {
    warningElements.push(<div className="warning" key={warning.path.join('.')}>
      <div className="warning-path">{warning.path.join('.')}:</div>
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