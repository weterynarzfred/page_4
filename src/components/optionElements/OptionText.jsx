import React from 'react';
import Hyphenated from 'react-hyphen';
import { connect } from 'react-redux';
import { getUserText } from '../../include/userTexts';

function OptionText(props) {
  return (
    <Hyphenated>
      {props.text}
    </Hyphenated>
  );
}

export default connect((state, props) => ({
  text: getUserText(props.optionKey, 'text'),
}))(OptionText);
