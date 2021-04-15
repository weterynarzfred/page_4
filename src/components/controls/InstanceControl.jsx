import React from 'react';
import { connect } from 'react-redux';
import PathLink from 'Components/PathLink';
import Currencies from '../Currencies';
import { actions } from '../../include/constants';
import { getUserValue } from '../../include/userValues';

function handleDelete() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.instanceKey,
    subtract: true,
  });
}

function InstanceControl(props) {
  return <div className="InstanceControl">
    <PathLink path={props.instanceKey}>
      <div className="instance-link-title">{props.title}</div>
      <Currencies optionKey={props.instanceKey} />
    </PathLink>
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
}))(InstanceControl);
