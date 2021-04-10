import React from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../../include/constants';
import { getUserText } from '../../include/userTexts';

function OptionTitle(props) {
  if (props.title === '') return null;
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
        {props.title}
      </div>
    </div>
  );
}

export default connect((state, props) => ({
  title: getUserText(props.optionKey, 'title'),
}))(OptionTitle);