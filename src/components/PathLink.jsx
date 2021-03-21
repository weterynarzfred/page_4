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
    <div className="PathLink" onClick={() => {
      if (props.onClick !== undefined) props.onClick();
      handleClick.call(props);
    }}>
      {props.children}
      {props.text}
    </div>
  );
}

export default connect()(PathLink);