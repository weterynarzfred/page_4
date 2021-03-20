import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';

function GroupControls(props) {
  const optionElements = [];
  for (const slug in props.option.options) {
    const option = props.option.options[slug];
    optionElements.push(<Option option={option} key={slug} currencies={props.currencies} />);
  }

  return (
    <div className="GroupControls">
      {optionElements}
    </div>
  );
}

export default connect(state => ({ selected: state.selected }))(GroupControls);