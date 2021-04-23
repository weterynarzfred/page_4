import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const requestImageFile = require.context('./../../media', true, /.(jpe?g|png|svg)$/);
const images = name => requestImageFile(name).default;

function OptionImage(props) {
  if (props.image === undefined) return (
    <div className="option-image-placeholder"></div>
  );

  return (
    <div className={classNames('OptionImage', { 'option-image-nsfw': props.nsfw })}>
      <div className="option-image-content">
        <img src={images(`./${props.image}`)} alt="" />
      </div>
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    image: option.image,
    nsfw: option.imageNSFW,
  };
})(OptionImage);
