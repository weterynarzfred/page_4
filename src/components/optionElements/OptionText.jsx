import React from 'react';
import Hyphenated from 'react-hyphen';
import getProp from '../../functions/getProp';

function OptionText(props) {
  return (
    <Hyphenated>
      {getProp('text', props.option)}
    </Hyphenated>
  );
}

export default OptionText;