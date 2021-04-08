import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(event) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    value: event.target.value,
  });
}

function TextControls(props) {
  return (
    <div className="TextControls">
      <input type="text" value={props.selectedValue} onChange={handleChange.bind(props)} />
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option, state.options),
  };
})(TextControls);