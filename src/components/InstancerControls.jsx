import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';
import { parseOptions } from '../include/parsedOptions';
import Option from './Option';

function handleAdd(value) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: {
      options: parseOptions(
        _.cloneDeep(this.option.instanceOptions),
        [...this.option.path, value.nextId]
      ),
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
      <button onClick={handleAdd.bind(props, value)}>add instance</button>
      <div className="instance-list">
        {instanceElements}
      </div>
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(InstancerControls);