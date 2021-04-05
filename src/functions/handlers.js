import { actions } from 'Include/constants';

function handleDecrement(value) {
  if (value <= this.min) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    subtract: 1,
  });
}

function handleIncrement(value) {
  if (value >= this.max) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    add: 1,
  });
}

function handleToggle(value) {
  if (value === 1) handleDecrement.call(this);
  else handleIncrement.call(this);
}

export { handleDecrement, handleIncrement, handleToggle };
