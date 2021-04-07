import React from 'react';

function Currencies(props) {
  if (props.currencies === undefined) return null;

  const currencyElements = [];
  for (const costSlug in props.currencies) {
    const cost = props.currencies[costSlug];
    const value = cost.value || 0;
    currencyElements.push(<div className="currency" key={costSlug}>
      <div className="currency-name">{cost.title}</div>
      <div className="currency-value">{value.toFixed(2)}</div>
    </div>);
  }

  return (
    <div className="Currencies">
      {currencyElements}
    </div>
  );
}

export default Currencies;