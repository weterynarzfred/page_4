import React from 'react';
import { connect } from 'react-redux';
import getOption from 'Functions/getOption';
import Option from './Option';

function OptionsList(props) {
  let currentOptions = {};
  const optionElements = [];
  if (props.path.length > 0) {
    const mainOption = getOption(props.path, props.options);
    currentOptions[mainOption.slug] = mainOption;

    for (const slug in currentOptions) {
      const option = currentOptions[slug];
      optionElements.push(<Option
        key={slug}
        option={option}
        currencies={props.currencies}
      />);
    }
  }

  return (
    <main className="OptionsList">
      {optionElements}
    </main>
  );
}

export default connect(state => ({
  path: state.path,
  options: state.options,
  currencies: state.currencies,
}))(OptionsList);