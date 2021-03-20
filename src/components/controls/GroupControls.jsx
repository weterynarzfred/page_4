import React from 'react';
import Option from 'Components/Option';

function GroupControls(props) {
  if (props.options === undefined) return null;

  const optionElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    optionElements.push(<Option
      option={option}
      key={slug}
      currencies={props.currencies}
    />);
  }
  if (optionElements.length === 0) return null;

  return (
    <div className="GroupControls">
      {optionElements}
    </div>
  );
}

export default GroupControls;