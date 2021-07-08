import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getUserValue } from '../../include/userValues';

const requestImageFile = require.context('../../content/media', true, /.(jpe?g|png|svg|webp)$/);
const requestImageLarge = require.context('../../content/media?large', true, /.(jpe?g|png|svg|webp)$/);
const images = name => requestImageFile(name).default;
const largeImages = name => requestImageLarge(name).default;

function OptionImage(props) {
  if (props.image === '' || props.image === undefined) return (
    <div className="option-image-placeholder"></div>
  );

  return (
    <div className={classNames('OptionImage', { 'option-image-nsfw': props.nsfw })}>
      <div className="option-image-content">
        <img src={images(`./${props.image}`)} alt="" />
        <svg className="image-open" viewBox="0 0 100 100" onClick={event => {
          event.stopPropagation();
          window.dispatchEvent(new CustomEvent(
            'lightboxOpen',
            {
              detail: {
                src: largeImages(`./${props.image}`),
                credits: getUserValue(props.optionKey, 'imageSource'),
                author: getUserValue(props.optionKey, 'imageAuthor'),
              }
            }
          ));
        }}>
          <path d="M10 50L90 50M50 10L50 90" />
        </svg>
      </div>
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (state.toggles.NSFWDisplay === 'hide_image' && option.imageNSFW) {
    return {};
  }
  return {
    image: getUserValue(props.optionKey, 'image'),
    nsfw: state.toggles.NSFWDisplay === 'blur' && option.imageNSFW,
  };
})(OptionImage);
