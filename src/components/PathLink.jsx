import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/enum';
import _ from 'lodash';

function handleClick() {
  const path = _.isArray(this.path) ?
    this.path :
    this.path.split('.').filter(e => e !== '');

  this.dispatch({
    type: actions.CHANGE_PATH,
    path,
  });
}

function PathLink(props) {
  return (
    <span className="PathLink" onClick={() => {
      if (props.onClick !== undefined) props.onClick();
      handleClick.call(props);
    }}>
      {props.children === undefined ? props.text : props.children}
    </span>
  );
}

export default connect()(PathLink);