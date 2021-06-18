import React from 'react';
import classNames from 'classnames';
import { getUserValue } from '../../include/userValues';
import { connect } from 'react-redux';

function OptionRequirements(props) {
  if (props.requirements === undefined) return null;

  const requirementElements = props.requirements
    .filter(test => !(test.value && test.hideWhenMet))
    .map((test, index) => <div className={classNames('requirement', { met: test.value })} key={index}>
      {getUserValue(props.optionKey, 'requirements.' + index + '.text')}
    </div>
    );

  if (requirementElements.length === 0) return null;

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
