import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserValue } from '../include/userValues';

function PathLink(props) {
  return (
    <Link to={'/' + props.path} className={`Link ${props.className || ''}`} onClick={event => {
      event.stopPropagation();
      if (props.onClick !== undefined) props.onClick();
    }}>
      {props.children ?? props.text}
    </Link>
  );
}

export default connect((state, props) => {
  if (props.optionKey === undefined) return {};

  return {
    text: getUserValue(props.optionKey, 'title'),
  };
})(PathLink);
