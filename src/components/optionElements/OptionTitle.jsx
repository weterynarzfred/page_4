import React from 'react';
import { connect } from 'react-redux';
import { optionTypes } from '../../include/constants';
import { getUserText } from '../../include/userTexts';

function OptionTitle(props) {
  if (props.title === '') return null;
  const showNumbering = [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.INSTANCER,
  ].includes(props.type) && props.numbering !== undefined;

  const numbering = showNumbering ? <div className="option-numbering">{props.numbering.join('.')}.</div> : null;

  return (
    <div className="option-title">
      {numbering}
      <div className="option-title-text" onClick={() => {
        if (props.onClick !== undefined) props.onClick();
      }}>
        {props.title}
      </div>
    </div>
  );
}

export default connect((state, props) => ({
  title: getUserText(props.optionKey, 'title'),
  type: state.options[props.optionKey].type,
  numbering: state.options[props.optionKey].numbering,
}))(OptionTitle);