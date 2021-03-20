import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/enum';
import getSelectedValue from 'Functions/getSelectedValue';
import Option from 'Components/Option';

function fixPathsInInstance(options, id, depth = 1) {
  for (const slug in options) {
    const option = options[slug];
    option.path.splice(-depth, 0, id);

    if (option.options !== undefined) {
      fixPathsInInstance(option.options, id, depth + 1);
    }
    if (option.choices !== undefined) {
      fixPathsInInstance(option.choices, id, depth + 1);
    }
  }
}

function handleAdd(value) {
  const instanceGroup = _.cloneDeep(this.option.instanceGroup);
  fixPathsInInstance(instanceGroup.options, value.nextId);

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: instanceGroup,
  });
}

function handleDelete(instance) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    subtract: instance,
  });
}

function InstancerControls(props) {
  const value = getSelectedValue(props.option, props.selected);
  const instanceElements = [];
  for (const slug in value) {
    if (isNaN(slug)) continue;
    const instance = value[slug];
    instanceElements.push(<div className="instance" key={slug}>
      <button
        className="delete-instance"
        onClick={handleDelete.bind(props, instance)}
      >
        <svg viewBox="0 0 100 100">
          <path d="M10 10L90 90" />
          <path d="M10 90L90 10" />
        </svg>
      </button>
      <Option option={instance} currencies={props.currencies} />
    </div>);
  }

  return (
    <div className="InstancerControls">
      <button
        className="add-instance"
        onClick={handleAdd.bind(props, value)}
      >add instance</button>
      <div className="instance-list">
        {instanceElements}
      </div>
    </div>
  );
}

export default connect(state => ({
  selected: state.selected
}))(InstancerControls);