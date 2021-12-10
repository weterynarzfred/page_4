import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { deepEquals } from '../../functions/deepFunctions';
import { getSelectedValue } from '../../functions/getSelectedValue';
import formatNumber from '../../functions/formatNumber';
import { getUserValue } from '../../include/userValues';

function OptionCost(props) {
  if (props.costs === undefined) return null;

  let costElements = [];
  for (const costSlug in props.costs) {
    let color = false;
    let displayValue = -props.costs[costSlug].value;
    if (displayValue > 0) {
      displayValue = `+ ${formatNumber(displayValue, 2)}`;
      color = 1;
    }
    else {
      if (displayValue < 0) {
        color = -1;
      }
      displayValue = `- ${formatNumber(-displayValue, 2)}`;
    }

    if (props.costs[costSlug].inverted) color *= -1;

    let currentCost = null;

    if (props.costOverride[costSlug] !== undefined) {
      currentCost = ' (' + formatNumber(-props.costOverride[costSlug], 2) + ')';
    } else if (
      props.selected !== 0 &&
      props.selected !== 1 &&
      props.selected !== undefined &&
      !isNaN(props.selected)
    ) {
      currentCost = ' (' + formatNumber(-props.selected * props.costs[costSlug].value, 2) + ')';
    }

    costElements.push(<tr className={classNames(
      'cost',
      { positive: color > 0 },
      { negative: color < 0 }
    )} key={costSlug}>
      <td className="cost-title">{props.costs[costSlug].title}</td>
      <td className="cost-value">
        {displayValue}
        {currentCost}
      </td>
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
  const optionCost = getUserValue(props.optionKey, 'cost');
  if (optionCost === undefined) return {};

  const costs = {};
  for (const costSlug in optionCost) {
    costs[costSlug] = {
      value: optionCost[costSlug],
      title: state.currencySettings[costSlug].title,
      inverted: state.currencySettings[costSlug].inverted,
    };
  }

  const costOverride = getUserValue(props.optionKey, 'costOverride');

  let selected;
  if (option.isRatioChoice) {
    const items = getSelectedValue(
      state.options[option.path.join('/')],
      state.options
    );
    for (const item of items) {
      if (item.optionKey === props.optionKey) {
        selected = item.percentage;
        break;
      }
    }
  } else {
    selected = getSelectedValue(option, state.options);
  }
  return {
    costs,
    costOverride,
    selected,
  };
}

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: deepEquals,
})(OptionCost);
