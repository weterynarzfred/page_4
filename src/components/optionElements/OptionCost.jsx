import React from 'react';
import classNames from 'classnames';

function OptionCost(props) {
  if (props.cost === undefined) return null;

  let costs = [];
  for (const costSlug in props.cost) {
    const classes = [];
    let displayValue = -props.cost[costSlug];
    if (displayValue > 0) {
      displayValue = `+ ${displayValue}`;
      classes.push('positive');
    }
    else {
      if (displayValue < 0) {
        classes.push('negative');
      }
      displayValue = `- ${-displayValue}`;
    }
    costs.push(<tr className={classNames('cost', classes)} key={costSlug}>
      <td className="cost-title">{props.currencies[costSlug].title}</td>
      <td className="cost-value">{displayValue}</td>
    </tr>);
  }

  return (
    <table className="OptionCost">
      <tbody>
        {costs}
      </tbody>
    </table>
  );
}

export default OptionCost;