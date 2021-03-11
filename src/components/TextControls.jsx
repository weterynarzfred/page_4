import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';

function handleChange(event) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    option: this.option,
    value: event.target.value,
  });
}

function TextControls(props) {
  const value = getSelected(props.option, props.selected);
  return (
    <div className="TextControls">
      <input type="text" value={value} onChange={handleChange.bind(props)} />
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(TextControls);