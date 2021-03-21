import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/enum';

function handleClick() {
  this.dispatch({
    type: actions.CHANGE_PATH,
    path: this.path.split('.').filter(e => e !== ''),
  });
}

function PathLink(props) {
  return (
    <div className="PathLink" onClick={handleClick.bind(props)}>
      {props.text}
    </div>
  );
}

export default connect()(PathLink);