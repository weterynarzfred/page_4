import React from 'react';
import PathLink from './PathLink';

function GoUpButton(props) {
  if (props.path.length < 2) return null;

  return (
    <div className="GoUpButton">
      <PathLink path={props.path.slice(0, -1).join('/')}>
        <svg viewBox="0 0 100 100">
          <path d="M65 10L25 50L65 90" />
        </svg>
      </PathLink>
    </div>
  );
}

export default GoUpButton;
