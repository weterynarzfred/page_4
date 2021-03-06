import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getUserValue } from '../../include/userValues';
import { optionTypes } from '../../include/constants';

const images = require.context('../../content/media', true, /.(jpe?g|png|svg|webp)$/);
const largeImages = require.context('../../content/media?large', true, /.(jpe?g|png|svg|webp)$/);

function OptionImage(props) {
  if (props.image === '' || props.image === undefined) {
    if (props.nsfw) {
      return <div className="OptionImage option-image-nsfw-placeholder">
        <div className="option-image-content">
          <div className="option-image-message">
            <div className="icon icon-negation">nsfw</div>
            <span>you can enable nsfw content in the menu</span>
          </div>
        </div>
      </div>;
    }
    return <div className="option-image-placeholder"></div>;
  };

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
    return {
      nsfw: true,
    };
  }

  const isContainer = props.topLevel || [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.RATIO,
    optionTypes.INSTANCER,
  ].includes(option.type);

  let image = getUserValue(props.optionKey, 'image');
  let imageSource = getUserValue(props.optionKey, 'imageSource');
  let imageAuthor = getUserValue(props.optionKey, 'imageAuthor');
  let imageNSFW = state.toggles.NSFWDisplay === 'blur' && option.imageNSFW;
  if (isContainer) {
    const containerImage = getUserValue(props.optionKey, 'containerImage');
    if (containerImage !== '') {
      image = containerImage;
      imageSource = getUserValue(props.optionKey, 'containerImageSource');
      imageAuthor = getUserValue(props.optionKey, 'containerImageAuthor');
      imageNSFW = state.toggles.NSFWDisplay === 'blur' && option.containerImageNSFW;
    }
  }

  return {
    image,
    imageSource,
    imageAuthor,
    nsfw: imageNSFW,
  };
})(OptionImage);
