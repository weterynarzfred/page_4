import React from 'react';
import Hyphenated from 'react-hyphen';

function OptionText(props) {
  if (props.text === undefined) return null;

  return (
    <Hyphenated>
      {props.text}
    </Hyphenated>
  );
}

export default OptionText;