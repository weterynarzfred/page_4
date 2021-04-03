import React from 'react';
import getProp from '../../functions/getProp';
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
      <div className="option-title-text">{getProp('title', props.option)}</div>
    </div>
  );
}

export default OptionTitle;