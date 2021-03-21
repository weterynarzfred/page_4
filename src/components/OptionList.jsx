import React from 'react';
import { connect } from 'react-redux';
import getOption from 'Functions/getOption';
import Option from './Option';
import PathLink from './PathLink';

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
  else {
    currentOptions = props.options;

    for (const slug in currentOptions) {
      const option = currentOptions[slug];
      optionElements.push(<PathLink
        key={slug}
        text={option.title}
        path={option.path.join('.')}
      />);
    }
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