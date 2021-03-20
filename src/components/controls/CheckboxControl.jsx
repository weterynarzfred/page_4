import React from 'react';
import classNames from 'classnames';

function CheckboxControl(props) {
  return (
    <div
      className={classNames('CheckboxControl', { checked: props.selected })}
      onClick={props.handleToggle}
    ></div>
  );
}

export default CheckboxControl;