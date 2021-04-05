import React from 'react';
import getProp from '../../functions/getProp';
import { optionTypes } from '../../include/constants';

function OptionTitle(props) {
  // const showNumbering = [
  //   optionTypes.GROUP,
  //   optionTypes.SELECT,
  //   optionTypes.INSTANCER,
  // ].includes(props.option.type);

  // const numbering = showNumbering ? <div className="option-numbering">{props.option.numbering.join('.')}.</div> : null;

  // return (
  //   <div className="option-title">
  //     {numbering}
  //     <div className="option-title-text" onClick={() => {
  //       if (props.onClick !== undefined) props.onClick();
  //     }}>{getProp('title', props.option)}</div>
  //   </div>
  // );

  return (
    <div className="option-title">
      <div className="option-title-text">
        {getProp(props.optionKey, 'title')}
      </div>
    </div>
  );
}

export default OptionTitle;