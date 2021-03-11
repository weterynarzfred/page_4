import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../include/enum';
import getSelected from '../functions/getSelected';

function handleChange(event) {
  const args = {
    type: actions.SELECT_OPTION,
    option: this.option,
  };
  if (event.target.checked) args.add = event.target.value;
  else args.subtract = event.target.value;
  this.dispatch(args);
}

function SelectChoice(props) {
  const value = getSelected(props.option, props.selected);

  return (
    <div className="SelectChoice">
      <label>
        <input
          type="checkbox"
          checked={value.includes(props.slug)}
          value={props.slug}
          onChange={handleChange.bind(props)}
        />
        {props.choice.title}
      </label>
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(SelectChoice);