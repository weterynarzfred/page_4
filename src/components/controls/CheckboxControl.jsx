import React from 'react';
import classNames from 'classnames';

function CheckboxControl(props) {
  return (
    <div
      className={classNames('CheckboxControl', 'option-controls', { checked: props.selected })}
      onClick={(event) => {
        event.stopPropagation();
        props.handleToggle();
      }}
    ></div>
  );
}

export default CheckboxControl;
