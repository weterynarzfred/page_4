import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

function OptionCost(props) {
  if (props.option.cost === undefined) return null;

  let costs = [];
  for (const costSlug in props.option.cost) {
    const classes = [];
    let displayValue = -props.option.cost[costSlug];
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

export default connect(state => ({
  currencies: state.currencies,
}))(OptionCost);