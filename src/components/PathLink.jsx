import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function PathLink(props) {
  const path = Array.isArray(props.path) ?
    props.path :
    props.path.split('.').filter(e => e !== '');

  return (
    <Link to={'/' + path.join('/')} className="Link" onClick={() => {
      if (props.onClick !== undefined) props.onClick();
    }}>
      {props.children === undefined ? props.text : props.children}
    </Link>
  );
}

export default connect()(PathLink);