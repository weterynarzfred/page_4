import React from 'react';
import _ from 'lodash';
import Option from '../Option';

function SelectControls(props) {

  const choiceElements = [];
  for (const slug in props.option.choices) {
    choiceElements.push(<Option
      key={slug}
      option={props.option.choices[slug]}
      currencies={props.currencies}
    />);
  }

  return (
    <div className="SelectControls">
      {choiceElements}
    </div>
  );
}

export default SelectControls;