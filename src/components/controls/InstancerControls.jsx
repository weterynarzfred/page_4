import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions } from '../../include/constants';
import InstanceControl from './InstanceControl';
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
  if (props.instances.length === 0) {
    instanceElements.push(<div className='instance-placeholder' key="placeholder">
      There are no instances yet.
    </div>);
  } else {
    for (const instanceKey of props.instances) {
      instanceElements.push(<InstanceControl
        instanceKey={instanceKey}
        key={instanceKey}
      />);
    }
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
