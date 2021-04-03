import { actions } from 'Include/constants';

function handleDecrement(value) {
  if (value <= this.option.min) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    subtract: 1,
  });
}

function handleIncrement(value) {
  if (value >= this.option.max) return;

  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    add: 1,
  });
}

function handleToggle(value) {
  if (value === 1) handleDecrement.call(this);
  else handleIncrement.call(this);
}

export { handleDecrement, handleIncrement, handleToggle };
