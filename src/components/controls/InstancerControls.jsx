import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/constants';
import InstanceControl from './InstanceControl';
import classNames from 'classnames';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleAdd() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    add: true,
  });
}

function InstancerControls(props) {
  const instanceElements = [];
  for (const instanceKey of props.instances) {
    instanceElements.push(<InstanceControl
      instanceKey={instanceKey}
      key={instanceKey}
    />);
  }

  const isAddDisabled = props.instances.length >= props.max;

  return <div className="InstancerControls option-controls">
    <button
      className={classNames('add-instance', { disabled: isAddDisabled })}
      onClick={isAddDisabled ? null : handleAdd.bind(props)}
    >
      add instance
    </button>
    <div className="instance-list">
      {instanceElements}
    </div>
  </div>;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  const instances = getSelectedValue(option, state.options);
  return {
    instances: instances,
    max: option.max,
    nextId: option.nextId,
  };
})(InstancerControls);