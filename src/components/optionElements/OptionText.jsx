import React from 'react';
import Hyphenated from 'react-hyphen';
import getProp from '../../functions/getProp';

function OptionText(props) {
  return (
    <Hyphenated>
      {getProp(props.optionKey, 'text')}
    </Hyphenated>
  );
}

export default OptionText;