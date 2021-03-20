import React from 'react';
import SelectChoice from 'Components/SelectChoice';

function SelectControls(props) {

  const choiceElements = [];
  for (const slug in props.option.choices) {
    const choice = props.option.choices[slug];
    choiceElements.push(<SelectChoice
      key={slug}
      option={props.option}
      choice={choice}
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