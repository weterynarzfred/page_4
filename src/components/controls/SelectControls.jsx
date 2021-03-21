import React from 'react';
import _ from 'lodash';
import SelectChoice from './SelectChoice';

function SelectControls(props) {

  const choiceElements = [];
  for (const slug in props.option.choices) {
    choiceElements.push(<SelectChoice
      key={slug}
      option={props.option}
      choice={props.option.choices[slug]}
      slug={slug}
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