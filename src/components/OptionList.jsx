import React from 'react';
import parsedOptions from './../include/parsedOptions';
import Option from './Option';

function OptionsList(props) {
  const optionElements = [];
  for (const slug in parsedOptions) {
    const option = parsedOptions[slug];
    optionElements.push(<Option key={slug} option={option} />);
  }

  return (
    <div className="OptionsList">
      {optionElements}
    </div>
  );
}

export default OptionsList;