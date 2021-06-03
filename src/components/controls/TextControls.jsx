import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../include/constants';
import { getSelectedValue } from '../../functions/getSelectedValue';

function handleChange(event) {
  this.dispatch({
    type: actions.SELECT_OPTION,
    optionKey: this.optionKey,
    value: event.target.value,
  });
}

function TextControls(props) {
  const inputProps = {
    value: props.selectedValue,
    onChange: handleChange.bind(props),
  };

  let inputElement;
  if (props.displayAsTextarea) {
    inputElement = <textarea
      placeholder="Enter your custom description here."
      {...inputProps}
    ></textarea>;
  }
  else {
    inputElement = <input
      type="text"
      placeholder="Enter your custom title here"
      {...inputProps}
    />;
  }
  return (
    <div className="TextControls option-control">
      {inputElement}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option, state.options),
    displayAsTextarea: option.displayAsTextarea
  };
})(TextControls);
