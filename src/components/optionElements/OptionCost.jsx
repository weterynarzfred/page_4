import React from 'react';
import classNames from 'classnames';

function OptionCost(props) {
  if (props.cost === undefined) return null;

  let costs = [];
  for (const costSlug in props.cost) {
    let color = false;
    let displayValue = -props.cost[costSlug];
    if (displayValue > 0) {
      displayValue = `+ ${displayValue}`;
      color = 1;
    }
    else {
      if (displayValue < 0) {
        color = -1;
      }
      displayValue = `- ${-displayValue}`;
    }

    if (props.currencies[costSlug].inverted) color *= -1;

    costs.push(<tr className={classNames(
      'cost',
      { positive: color > 0 },
      { negative: color < 0 }
    )} key={costSlug}>
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