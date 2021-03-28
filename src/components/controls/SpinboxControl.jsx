import React from 'react';
import classNames from 'classnames';

function SpinboxControl(props) {
  const isIncrementDisabled = props.value >= props.max;
  const isDecrementDisabled = props.value <= props.min;

  return (
    <div className="integer-spinbox">
      <div className="integer-spinbox-content">
        <button
          onClick={isDecrementDisabled ? null : props.handleDecrement}
          className={classNames({ disabled: isDecrementDisabled })}
        >-</button>
        <div className="integer-value">{props.value}</div>
        <button
          onClick={isIncrementDisabled ? null : props.handleIncrement}
          className={classNames({ disabled: isIncrementDisabled })}
        >+</button>
      </div>
    </div>
  );
}

export default SpinboxControl;