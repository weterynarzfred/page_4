import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCount } from '../../functions/getSelectedValue';
import { handleToggle } from '../../functions/handlers';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
  event.stopPropagation();
  const value = getSelectedCount(this.option, this.options);
  handleToggle.call(this, value);
}

function ChoiceTable(props) {
  return (
    <tr className={props.classes} onClick={handleClick.bind(props)}>
      <td className="choice-control-cell">
        <OptionControls option={props.option} currencies={props.currencies} />
      </td>
      <td className="choice-title-cell">
        <OptionTitle option={props.option} />
      </td>
      <td className="option-text">
        <OptionText option={props.option} />
        <OptionRequirements option={props.option} />
      </td>
      <td className="choice-cost-cell">
        <OptionCost cost={props.option.cost} currencies={props.currencies} />
      </td>
    </tr>
  );
}

export default connect(state => ({
  options: state.options,
}))(ChoiceTable);