import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';

function OptionsList(props) {
  // const optionElements = [];

  // for (const slug in props.currentOptions) {
  //   const option = props.currentOptions[slug];
  //   optionElements.push(<Option
  //     key={slug}
  //     option={option}
  //     currencies={props.currencies}
  //     topLevel={true}
  //   />);
  // }

  return (
    <main className="OptionsList">
      {props.optionKeys.join(' | ')}
    </main>
  );
}

export default connect(state => {
  const currentOptionKeys = [];
  const currentKey = new RegExp(`^${state.path.join('.')}`);
  for (const key in state.options) {
    if (key === currentKey) {
      currentOptionKeys.push(key);
    }
  }
  return {
    optionKeys: currentOptionKeys,
  };
})(OptionsList);
