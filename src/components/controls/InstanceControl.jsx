import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../include/constants';
import { getUserValue } from '../../include/userValues';
import PathLink from '../PathLink';
import Currencies from '../Currencies';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleDelete() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.instanceKey,
    subtract: true,
  });
}

function InstanceControl(props) {
  return <div className="InstanceControl">
    <PathLink path={props.instanceKey} className="instance-link-button">
      <span className="instance-link-title">{props.title}</span>
      <span className="instance-link-edit">edit</span>
    </PathLink>
    <Currencies optionKey={props.instanceKey} />
    <div className="instance-link-text">{props.description}</div>
    <button
      className="delete-instance"
      onClick={handleDelete.bind(props)}
    >
      <svg viewBox="0 0 100 100">
        <path d="M10 10L90 90" />
        <path d="M10 90L90 10" />
      </svg>
    </button>
  </div>;
}

export default connect((state, props) => ({
  title: getUserValue(props.instanceKey, 'title'),
  description: getSelectedValue(state.options[props.instanceKey + '/description'], state.options),
}))(InstanceControl);
