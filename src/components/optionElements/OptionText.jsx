import React from 'react';
import Hyphenated from 'react-hyphen';
import { connect } from 'react-redux';
import getProp from '../../functions/getProp';

function OptionText(props) {
  return (
    <Hyphenated>
      {props.text}
    </Hyphenated>
  );
}

export default connect((state, props) => ({
  text: getProp(props.optionKey, 'text'),
}))(OptionText);