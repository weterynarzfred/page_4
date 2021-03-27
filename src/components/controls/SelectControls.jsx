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
      displayAsTableRow={props.option.displayAsTable}
    />);
  }

  let content;
  if (props.option.displayAsTable) {
    content = <table>
      <tbody>
        {choiceElements}
      </tbody>
    </table>;
  }
  else {
    content = choiceElements;
  }

  return (
    <div className="SelectControls">
      {content}
    </div>
  );
}

export default SelectControls;