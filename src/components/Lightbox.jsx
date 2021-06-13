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

  return <div
    id="Lightbox"
    className={classNames({ opened: content })}
    onClick={() => setContent(false)}
  >
    {content ? <img
      className="lightbox-image"
      src={content}
    /> : null}
  </div>;
}

export default connect()(Lightbox);
