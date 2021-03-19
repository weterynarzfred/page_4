import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';
import Option from './Option';

function handleAdd(value) {
  const instanceOptions = _.cloneDeep(this.option.instanceOptions);
  for (const slug in instanceOptions) {
    const option = instanceOptions[slug];
    option.path.splice(-1, 0, value.nextId);
  }

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: {
      options: instanceOptions,
    },
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
  const value = getSelected(props.option, props.selected);
  const instanceElements = [];
  for (const slug in value) {
    if (isNaN(slug)) continue;
    const instance = value[slug];
    instanceElements.push(<div className="instance" key={slug}>
      <button onClick={handleDelete.bind(props, instance)}>delete</button>
      <Option option={instance} />
    </div>);
  }

  return (
    <div className="InstancerControls">
      <button className="add-instance" onClick={handleAdd.bind(props, value)}>add instance</button>
      <div className="instance-list">
        {instanceElements}
      </div>
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(InstancerControls);