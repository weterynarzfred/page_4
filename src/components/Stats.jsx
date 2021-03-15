import React from 'react';

function Stats(props) {
  if (props.currencies === undefined) return null;

  const currencyElements = [];
  for (const costSlug in props.currencies) {
    const cost = props.currencies[costSlug];
    currencyElements.push(<div className="currency" key={costSlug}>
      <div className="currency-name">{cost.title}</div>
      <div className="currency-value">{cost.value}</div>
    </div>);
  }

  return (
    <div className="Stats">
      {currencyElements}
    </div>
  );
}

export default Stats;