import React from 'react';
import classNames from 'classnames';
import { getUserText } from '../../include/userTexts';
import { connect } from 'react-redux';

function OptionRequirements(props) {
  if (props.requirements === undefined) return null;

  const requirementElements = props.requirements.map((test, index) =>
    <div className={classNames('requirement', { met: test })} key={index}>
      {getUserText(props.optionKey, 'requirements.' + index)}
    </div>
  );

  return (
    <div className="OptionRequirements">
      <div className="requirements-title">requirements</div>
      {requirementElements}
    </div>
  );
}

export default connect((state, props) => ({
  requirements: state.options[props.optionKey].requirements
}))(OptionRequirements);