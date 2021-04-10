import React from 'react';
import { connect } from 'react-redux';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleToggle } from '../../functions/handlers';
import isDisabled from '../../functions/isDisabled';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
  if (this.isDisabled) return;
  event.stopPropagation();
  handleToggle.call(this, this.selectedValue);
}

function ChoiceTable(props) {
  return (
    <tr className={props.classes} onClick={handleClick.bind(props)}>
      <td className="choice-control-cell">
        <OptionControls optionKey={props.optionKey} />
      </td>
      <td className="choice-title-cell">
        <OptionTitle optionKey={props.optionKey} />
      </td>
      <td className="option-text">
        <OptionText optionKey={props.optionKey} />
        <OptionRequirements optionKey={props.optionKey} />
      </td>
      <td className="choice-cost-cell">
        <OptionCost optionKey={props.optionKey} />
      </td>
    </tr>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    selectedValue: getSelectedValue(option, state.options),
    isDisabled: isDisabled(option),
  };
})(ChoiceTable);