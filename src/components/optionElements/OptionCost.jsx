import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

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

    if (props.currencySettings[costSlug] === undefined) {
      console.error(`Currency ${costSlug} not found`);
      return null;
    }
    if (props.currencySettings[costSlug].inverted) color *= -1;

    costs.push(<tr className={classNames(
      'cost',
      { positive: color > 0 },
      { negative: color < 0 }
    )} key={costSlug}>
      <td className="cost-title">{props.currencySettings[costSlug].title}</td>
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

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (option.cost === undefined) return {};
  const currencySettings = {};
  for (const costSlug in state.currencies) {
    currencySettings[costSlug] = {
      title: state.currencies[costSlug].title,
      inverted: state.currencies[costSlug].inverted,
    };
  }
  return {
    cost: option.cost,
    currencySettings,
  };
})(OptionCost);