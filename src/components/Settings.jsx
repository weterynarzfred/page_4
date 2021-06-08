import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../include/constants';

const NSFWDisplayOptions = [
  { value: 'hide_image', text: 'hide image' },
  { value: 'blur', text: 'unblur image on hover' },
  { value: 'show', text: 'show' },
];

const unitsOptions = [
  { value: 'metric', text: 'metric' },
  { value: 'imperial', text: 'imperial' },
];

function handleChange(key, event) {
  this.dispatch({
    type: actions.TOGGLE,
    key,
    value: event.currentTarget.value,
  });
}

function Settings(props) {

  return <div className="Settings">
    <div className="navigation-title">Settings</div>
    <div className="setting-row">
      <div className="setting-name">NSFW display:</div>
      <select
        onChange={handleChange.bind(props, 'NSFWDisplay')}
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
    <div className="setting-row">
      <div className="setting-name">units:</div>
      <select
        onChange={handleChange.bind(props, 'units')}
        value={props.units}
      >
        {unitsOptions.map(element => <option
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
    units: state.toggles.units,
  };
})(Settings);