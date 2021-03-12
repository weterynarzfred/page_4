import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';

function OptionsList(props) {
  const optionElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    optionElements.push(<Option key={slug} option={option} />);
  }

  return (
    <div className="OptionsList">
      {optionElements}
    </div>
  );
}

export default connect(state => ({ options: state.options }))(OptionsList);