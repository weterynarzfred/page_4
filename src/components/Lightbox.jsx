import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

function Lightbox(props) {
  const [content, setContent] = useState(false);
  useEffect(() => {
    const handler = event => {
      setContent(event.detail);
    };

    window.addEventListener('lightboxOpen', handler);

    return () => {
      window.removeEventListener('lightboxOpen', handler);
    };
  }, []);

  let creditsElement = null;
  if (content?.credits) {
    creditsElement = <div className="lightbox-credits">
      source: <a href={content.credits} target="_blank">
        {content?.author ? content.author : content.credits}
      </a>
    </div>;
  } else if (content?.author) {
    creditsElement = <div className="lightbox-credits">
      source: {content.author}
    </div>;
  }


  return <div
    id="Lightbox"
    className={classNames({ opened: content })}
    onClick={() => setContent(false)}
  >
    {content ? <img
      className="lightbox-image"
      src={content.src}
    /> : null}
    {creditsElement}
  </div>;
}

export default connect()(Lightbox);
