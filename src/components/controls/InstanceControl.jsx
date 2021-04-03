import React from 'react';
import { connect } from 'react-redux';
import PathLink from 'Components/PathLink';
import Currencies from '../Currencies';
import { actions } from '../../include/constants';
import getProp from '../../functions/getProp';

function handleDelete() {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.instancer,
    subtract: this.instance,
  });
}

function InstanceControl(props) {
  return (
    <div className="InstanceControl">
      <PathLink path={props.instance.path.join('.')}>
        <div className="instance-link-title">{getProp('title', props.instance)}</div>
        <Currencies currencies={props.instance.currencies} />
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
    </div>
  );
}

export default connect()(InstanceControl);