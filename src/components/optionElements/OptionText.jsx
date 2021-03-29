import React from 'react';
import Hyphenated from 'react-hyphen';
import { dataTypes } from '../../include/enum';
import { getUserText } from '../../include/userTexts';

function OptionText(props) {
  if (props.text === undefined) return null;

  let text;
  if (props.text === dataTypes.USER_TEXT) {
    text = getUserText(props.path);
  }
  else {
    text = props.text;
  }
  if (text === undefined) console.log(props.path, text);

  return (
    <Hyphenated>
      {text}
    </Hyphenated>
  );
}

export default OptionText;