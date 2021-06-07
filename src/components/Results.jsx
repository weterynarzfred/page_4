import React from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../include/constants';
import { isSelected } from '../functions/getSelectedValue';
import { getUserValue } from '../include/userValues';

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

  return <div className="Results">
    {optionElements}
  </div>;
}

export default connect(state => {
  return {
    options: state.options,
  };
})(Results);
