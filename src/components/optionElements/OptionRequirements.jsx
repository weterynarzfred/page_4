import React from 'react';
import classNames from 'classnames';
import { dataTypes } from '../../include/constants';
import { getUserText } from '../../include/userTexts';

function OptionRequirements(props) {
  if (props.option.requirements === undefined) return null;

  const requirements = [];
  let index = 0;
  for (const test of props.option.requirements) {
    let text;
    if (test.text === dataTypes.USER_TEXT) {
      text = getUserText([...props.option.path, `requirement-${index}`]);
    }
    else {
      text = test.text;
    }
    requirements.push(<div
      className={classNames('requirement', { met: test.value })}
      key={index}
    >
      {text}
    </div>);
    index++;
  }

  return (
    <div className="OptionRequirements">
      <div className="requirements-title">requirements</div>
      {requirements}
    </div>
  );
}

export default OptionRequirements;