import React from 'react';
import { connect } from 'react-redux';
import getSelected from '../functions/getSelected';
import { actions } from '../include/enum';

function handleChange(event) {
  const args = {
    type: actions.SELECT_OPTION,
    option: this.option,
  };
  if (event.target.checked) args.add = event.target.value;
  else args.subtract = event.target.value;
  this.dispatch(args);
}

function SelectControls(props) {
  const value = getSelected(props.option, props.selected);

  const choiceElements = [];
  for (const slug in props.option.choices) {
    const choice = props.option.choices[slug];
    choiceElements.push(<div className="choice" key={slug}>
      <label>
        <input
          type="checkbox"
          checked={value.includes(slug)}
          value={slug}
          onChange={handleChange.bind(props)}
        />
        {choice.title}
      </label>
    </div>);
  }

  return (
    <div className="SelectControls">
      {choiceElements}
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(SelectControls);