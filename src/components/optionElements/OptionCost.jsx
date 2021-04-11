import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { deepEquals } from '../../functions/deepFunctions';

function OptionCost(props) {
  if (props.costs === undefined) return null;

  let costElements = [];
  for (const costSlug in props.costs) {
    let color = false;
    let displayValue = -props.costs[costSlug].value;
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

    if (props.costs[costSlug].inverted) color *= -1;

    costElements.push(<tr className={classNames(
      'cost',
      { positive: color > 0 },
      { negative: color < 0 }
    )} key={costSlug}>
      <td className="cost-title">{props.costs[costSlug].title}</td>
      <td className="cost-value">{displayValue}</td>
    </tr>);
  }

  return (
    <table className="OptionCost">
      <tbody>
        {costElements}
      </tbody>
    </table>
  );
}

function mapStateToProps(state, props) {
  const option = state.options[props.optionKey];
  if (option.cost === undefined) return {};

  const costs = {};
  for (const costSlug in option.cost) {
    costs[costSlug] = {
      value: option.cost[costSlug],
      title: state.currencySettings[costSlug].title,
      inverted: state.currencySettings[costSlug].inverted,
    };
  }
  return {
    costs
  };
}

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: deepEquals,
})(OptionCost);
