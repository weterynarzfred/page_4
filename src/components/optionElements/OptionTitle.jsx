import React from 'react';
import { optionTypes } from '../../include/enum';

function OptionTitle(props) {
  const showNumbering = [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.INSTANCER,
  ].includes(props.option.type);

  const numbering = showNumbering ? <div className="option-numbering">{props.option.numbering.join('.')}.</div> : null;

  return (
    <div className="option-title">
      {numbering}
      <div className="option-title-text">{props.option.title}</div>
    </div>
  );
}

export default OptionTitle;