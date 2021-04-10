import React from 'react';
import classNames from 'classnames';

function SpinboxControl(props) {
  return (
    <div className="SpinboxControl option-controls">
      <div className="integer-spinbox-content">
        <button
          onClick={(event) => {
            event.stopPropagation();
            props.handleDecrement();
          }}
          className={classNames({ disabled: props.value <= props.min })}
        >-</button>
        <div className="integer-value">{props.value}</div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            props.handleIncrement();
          }}
          className={classNames({ disabled: props.value >= props.max })}
        >+</button>
      </div>
    </div>
  );
}

export default SpinboxControl;