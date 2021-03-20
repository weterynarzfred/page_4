import React from 'react';
import classNames from 'classnames';

function SpinboxControl(props) {
  return (
    <div className="integer-spinbox">
      <div className="integer-spinbox-content">
        <button
          onClick={props.handleDecrement}
          className={classNames({ disabled: props.value <= props.min })}
        >-</button>
        <div className="integer-value">{props.value}</div>
        <button
          onClick={props.handleIncrement}
          className={classNames({ disabled: props.value >= props.max })}
        >+</button>
      </div>
    </div>
  );
}

export default SpinboxControl;