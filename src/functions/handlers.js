import { actions } from 'Include/constants';

/**
 * Dispatches an action decreasing the option's value by 1.
 */
function handleDecrement(value) {
  if (value <= this.min) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    subtract: 1,
  });
}

/**
 * Dispatches an action increasing the option's value by 1.
 */
function handleIncrement(value) {
  if (value >= this.max) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    add: 1,
  });
}

/**
 * Dispatches an action toggling the option's value between 0 and 1.
 */
function handleToggle(value) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    value: value >= 1 ? 0 : 1,
  });
}

export { handleDecrement, handleIncrement, handleToggle };
