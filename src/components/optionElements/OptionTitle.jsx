import React from 'react';
import { optionTypes } from '../../include/constants';
import { getUserText } from '../../include/userTexts';

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
        {getUserText(props.optionKey, 'title')}
      </div>
    </div>
  );
}

export default OptionTitle;