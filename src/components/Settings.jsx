import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../include/constants';

const NSFWDisplayOptions = [
  { value: 'hide_option', text: 'hide option' },
  { value: 'hide_image', text: 'hide image' },
  { value: 'blur', text: 'unblur image on hover' },
  { value: 'show', text: 'show' },
];

function handleChange(event) {
  this.dispatch({
    type: actions.TOGGLE,
    key: 'NSFWDisplay',
    value: event.currentTarget.value,
  });
}

function Settings(props) {

  return <div className="Settings">
    <div className="settings-title">Settings</div>
    <div className="setting-row">
      <div className="setting-name">NSFW display:</div>
      <select
        onChange={handleChange.bind(props)}
        value={props.NSFWDisplay}
      >
        {NSFWDisplayOptions.map(element => <option
          key={element.value}
          value={element.value}
        >
          {element.text}
        </option>)}
      </select>
    </div>
  </div>;
}

export default connect(function (state) {
  return {
    NSFWDisplay: state.toggles.NSFWDisplay,
  };
})(Settings);