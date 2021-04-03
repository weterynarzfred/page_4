import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'Include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(event) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    value: event.target.value,
  });
}

function TextControls(props) {
  const value = getSelectedValue(props.option);
  return (
    <div className="TextControls">
      <input type="text" value={value} onChange={handleChange.bind(props)} />
    </div>
  );
}

export default connect(state => ({ options: state.options }))(TextControls);