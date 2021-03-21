import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';

function OptionsList(props) {
  const optionElements = [];

  for (const slug in props.currentOptions) {
    const option = props.currentOptions[slug];
    optionElements.push(<Option
      key={slug}
      option={option}
      currencies={props.currencies}
      topLevel={true}
    />);
  }

  return (
    <main className="OptionsList">
      {optionElements}
    </main>
  );
}

export default connect(state => ({
  options: state.options,
}))(OptionsList);