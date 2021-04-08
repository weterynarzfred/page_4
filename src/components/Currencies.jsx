import React from 'react';
import { connect } from 'react-redux';

function Currencies(props) {
  if (props.currencies === undefined) return null;

  const currencyElements = [];
  for (const costSlug in props.currencies) {
    const title = props.currencySettings[costSlug].title;
    const value = props.currencies[costSlug] || 0;
    currencyElements.push(<div className="currency" key={costSlug}>
      <div className="currency-name">{title}</div>
      <div className="currency-value">{value.toFixed(2)}</div>
    </div>);
  }

  return (
    <div className="Currencies">
      {currencyElements}
    </div>
  );
}

export default connect(state => ({
  currencySettings: state.currencySettings,
}))(Currencies);