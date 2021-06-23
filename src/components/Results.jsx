import React from 'react';
import { connect } from 'react-redux';
import { actions, optionTypes } from '../include/constants';
import { isSelected } from '../functions/getSelectedValue';
import { getUserValue } from '../include/userValues';
import { deepClone } from '../functions/deepFunctions';

function handleChange(event) {
  this.dispatch({
    type: actions.LOAD_DATA,
    payload: event.currentTarget.value,
  });
}

function Results(props) {
  const optionElements = Object.keys(props.options).map(optionKey => {
    const option = props.options[optionKey];
    if (![optionTypes.INTEGER, optionTypes.SLIDER].includes(option.type)) return;
    if (!isSelected(option, props.options)) return;
    return <div className="result-option" key={optionKey}>
      <div className="result-option-key">{optionKey}</div>
      <div className="result-option-title">{getUserValue(optionKey, 'title')}</div>
    </div>;
  });

  const saveData = {
    cyoaId: props.cyoaId,
    options: {},
    toggles: props.toggles,
  };

  // saveData.options = props.options;
  for (const optionKey in props.options) {
    saveData.options[optionKey] = {};
    for (const prop in props.options[optionKey]) {
      if (['slug', 'path', 'optionKey', 'lastCurrencyValues'].includes(prop)) continue;
      saveData.options[optionKey][prop] = props.options[optionKey][prop];
    }
  }

  let indentLevel = 0;
  const saveString = JSON.stringify(saveData)
    .replaceAll(/([\{\[,])/g, "$1\n")
    .replaceAll(/([\}\]])/g, "\n$1")
    .replaceAll(/:/g, ': ')
    .replaceAll(/^.*$/gm, (match) => {
      if (match.match(/[\}\]],?$/)) indentLevel--;
      let indent = '';
      for (let i = 0; i < indentLevel; i++) indent += '  ';
      if (match.match(/[\{\[]$/)) indentLevel++;
      return indent + match;
    });

  return <div className="Results">
    <textarea value={saveString} spellCheck="false" onChange={handleChange.bind(props)} />
    {optionElements}
  </div>;
}

export default connect(state => {
  return {
    options: state.options,
    cyoaId: state.cyoaId,
    toggles: state.toggles,
  };
})(Results);
