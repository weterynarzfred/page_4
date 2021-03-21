import React from 'react';
import { connect } from 'react-redux';
import Option from 'Components/Option';
import getOption from '../functions/getOption';

function OptionsList(props) {
  let currentOptions = {};
  if (props.path.length > 0) {
    const mainOption = getOption(props.path, props.options);
    currentOptions[mainOption.slug] = mainOption;
  }
  else currentOptions = props.options;

  const optionElements = [];
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    optionElements.push(<Option
      key={slug}
      option={option}
      currencies={props.currencies}
    />);
  }

  return (
    <div className="OptionsList">
      {optionElements}
    </div>
  );
}

export default connect(state => ({
  path: state.path,
  options: state.options,
  currencies: state.currencies,
}))(OptionsList);