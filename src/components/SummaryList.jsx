import React from 'react';
import SummaryItem from './SummaryItem';

function SummaryList(props) {
  if (props.options === undefined) return null;

  const items = [];
  for (const slug in props.options) {
    items.push(<SummaryItem key={slug} option={props.options[slug]} />);
  }

  return (
    <ul className="SummaryList">
      {items}
    </ul>
  );
}

export default SummaryList;