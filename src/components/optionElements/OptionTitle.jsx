import React from 'react';

function OptionTitle(props) {
  const numbering = props.showNumbering ? <div className="option-numbering">{props.option.numbering.join('.')}.</div> : null;

  return (
    <div className="option-title">
      {numbering}
      <div className="option-title-text">{props.option.title}</div>
    </div>
  );
}

export default OptionTitle;