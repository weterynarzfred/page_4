import React from 'react';
import { connect } from 'react-redux';
import { getUserValue } from '../../include/userValues';

function OptionTitle(props) {
  if (props.title === '') return null;

  return (
    <div className="option-title">
      <div className="option-title-text" onClick={() => {
        if (props.onClick !== undefined) props.onClick();
      }}>
        {props.title}
      </div>
    </div>
  );
}

export default connect((state, props) => ({
  title: getUserValue(props.optionKey, 'displayTitle'),
  type: state.options[props.optionKey].type,
}))(OptionTitle);
