import React from 'react';

function OptionImage(props) {
  if (props.image === undefined) return (
    <div className="option-image-placeholder"></div>
  );

  return (
    <div className="OptionImage">
      <div
        className="option-image-content"
        style={{ backgroundImage: `url(./images/${props.image})` }}
      ></div>
    </div>
  );
}

export default OptionImage;