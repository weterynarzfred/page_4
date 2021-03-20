import React from 'react';
import { connect } from 'react-redux';
import Option from 'Components/Option';

function OptionsList(props) {
  const optionElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    optionElements.push(<Option key={slug} option={option} currencies={props.currencies} />);
  }

  return (
    <div className="OptionsList">
      {optionElements}
    </div>
  );
}

export default connect(state => ({
  options: state.options,
  currencies: state.currencies,
}))(OptionsList);