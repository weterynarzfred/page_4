import React from 'react';
import classNames from 'classnames';

function OptionRequirements(props) {
  if (props.option.requirements === undefined) return null;

  const requirements = [];
  let index = 0;
  for (const test of props.option.requirements) {
    requirements.push(<div className={classNames('requirement', { met: test.value })} key={index}>
      {test.text}
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