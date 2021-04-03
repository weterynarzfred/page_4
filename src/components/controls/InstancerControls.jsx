import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/constants';
import deepClone from '../../functions/deepClone';
import InstanceControl from './InstanceControl';
import classNames from 'classnames';
import { getSelectedValue } from '../../functions/getSelectedValue';

function fixPathsInInstance(options, id, depth = 1) {
  if (options === undefined) return;

  for (const slug in options) {
    const option = options[slug];
    option.path.splice(-depth, 0, id);

    fixPathsInInstance(option.options, id, depth + 1);
    fixPathsInInstance(option.choices, id, depth + 1);
  }
}

function handleAdd(nextId) {
  const instanceGroup = deepClone(this.option.instanceGroup);
  fixPathsInInstance(instanceGroup.options, nextId);

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: instanceGroup,
  });
}


function InstancerControls(props) {
  const nextId = props.option.selected === undefined ? 0 : props.option.selected.nextId;
  const selected = getSelectedValue(props.option, props.options);
  const instanceElements = [];
  for (const slug in selected) {
    instanceElements.push(<InstanceControl
      instancer={props.option}
      instance={selected[slug]}
      key={slug}
    />);
  }

  const isAddDisabled = Object.keys(selected).length >= props.option.max;

  return (
    <div className="InstancerControls">
      <button
        className={classNames(
          'add-instance',
          { disabled: isAddDisabled }
        )}
        onClick={isAddDisabled ? null : handleAdd.bind(props, nextId)}
      >add instance</button>
      <div className="instance-list">
        {instanceElements}
      </div>
    </div>
  );
}

export default connect(state => ({
  options: state.options
}))(InstancerControls);