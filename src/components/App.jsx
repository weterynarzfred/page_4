import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import '../scss/index.scss';
import { actions } from '../include/constants';
import Navigation from './Navigation';
import Stats from './Stats';
import Dialog from './Dialog';
import Option from './Option';
import { settings } from 'cyoa';

function startHoverDetection() {
  let hasHover = false;
  let lastTouchTime = 0;

  document.addEventListener('touchstart', () => {
    lastTouchTime = new Date();
    if (!hasHover) return;
    document.body.classList.remove('has-hover');
    hasHover = false;
  });

  document.addEventListener('mousemove', () => {
    if (hasHover) return;
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add('has-hover');
    hasHover = true;
  });
}

function App(props) {
  useEffect(() => {
    const currentPath = props.location.pathname.split('/')
      .filter(e => e !== '');
    if (currentPath.join('/') === props.path.join('/')) return;

    window.scrollTo(0, 0);
    props.dispatch({
      type: actions.CHANGE_PATH,
      path: currentPath,
    });
  }, [props.location.pathname]);

  // skip the disclaimer in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    if (props.disclaimerClosed || settings.disclaimer === undefined) return;

    const acceptButton = {
      onClick: () => {
        props.dispatch({
          type: actions.TOGGLE,
          key: 'disclaimerClosed',
        });
      },
      text: 'ok',
    };

    window.dispatchEvent(new CustomEvent('dialogOpen', {
      detail: {
        title: 'Disclaimer',
        text: settings.disclaimer,
        buttons: [acceptButton],
      }
    }));
  }, [props.disclaimerClosed]);

  useEffect(() => {
    document.title = settings.cyoaId;
    startHoverDetection();
  }, []);

  const history = useHistory();
  if (!props.exists) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  return <div className="App">
    <Navigation />
    <Stats />
    <div id="option-list">
      <Option optionKey={props.path.join('/')} topLevel={true} />
    </div>
    <Dialog />
    <div id="overlay"></div>
  </div>;
}

export default connect(state => {
  const exists = state.path.length === 0 || state.options[state.path.join('/')] !== undefined;
  return {
    path: state.path,
    exists,
    disclaimerClosed: state.toggles.disclaimerClosed,
  };
})(App);
