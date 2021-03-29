import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

function Dialog(props) {
  const dialogRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState({
    title: null,
    text: null,
    buttons: [],
  });
  useEffect(() => {
    const handler = event => {
      setOpened(true);
      setContent(event.detail);
    };
    window.addEventListener('dialogOpen', handler);

    return () => {
      window.removeEventListener('dialogOpen', handler);
    };
  }, []);

  return (
    <div
      className={classNames('Dialog', { opened })}
      ref={dialogRef}
    >
      <div className="dialog-content">
        <svg
          className="dialog-close"
          viewBox="0 0 100 100"
          onClick={() => setOpened(false)}
        >
          <path d="M10 10L90 90" />
          <path d="M10 90L90 10" />
        </svg>
        <div className="dialog-title">{content.title}</div>
        <div className="dialog-text">{content.text}</div>
        <div className="dialog-buttons">
          {content.buttons.map((button, index) => (
            <button onClick={() => {
              setOpened(false);
              button.onClick();
            }} key={index}>{button.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dialog;