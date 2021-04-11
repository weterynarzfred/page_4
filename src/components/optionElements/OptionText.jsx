import React from 'react';
import Hyphenated from 'react-hyphen';
import { connect } from 'react-redux';
import { getUserValue } from '../../include/userValues';

function OptionText(props) {
  return (
    <Hyphenated>
      {props.text}
    </Hyphenated>
  );
}

export default connect((state, props) => ({
  text: getUserValue(props.optionKey, 'text'),
}))(OptionText);
