import React from 'react';
import { connect } from 'react-redux';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleToggle } from '../../functions/handlers';
import isDisabled from '../../functions/isDisabled';
import { getUserValue } from '../../include/userValues';
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

function Cell(props) {
  if (!props.tableColumns.includes(props.column)) return null;

  switch (props.column) {
    case 'control':
      return <td className="choice-control-cell">
        <OptionControls optionKey={props.optionKey} />
      </td>;
    case 'title':
      return <td className="choice-title-cell">
        <OptionTitle optionKey={props.optionKey} />
      </td>;
    case 'text':
      return <td className="choice-text">
        <OptionText optionKey={props.optionKey} />
        <OptionRequirements optionKey={props.optionKey} />
      </td>;
    case 'cost':
      return <td className="choice-cost-cell">
        <OptionCost optionKey={props.optionKey} />
      </td>;
    default:
      const detail = getUserValue(props.optionKey, 'detail');
      if (detail === undefined || detail[props.column] === undefined) return null;
      return <td className={`choice-${props.column}-cell`}>
        {detail[props.column].text}
      </td>;
  }
}

function ChoiceTable(props) {
  return (
    <tr className={props.classes} onClick={handleClick.bind(props)}>
      {props.tableColumns.map(column => <Cell
        key={column}
        optionKey={props.optionKey}
        column={column}
        tableColumns={props.tableColumns}
      />)}
    </tr>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  const parent = state.options[option.path.join('/')];
  return {
    selectedValue: getSelectedValue(option, state.options),
    isDisabled: isDisabled(option),
    tableColumns: parent.tableColumns || ['control', 'title', 'text', 'cost'],
  };
})(ChoiceTable);
