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
import Results from './Results';
import Lightbox from './Lightbox';
import Changelog from './Changelog';

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

function enableTooltips() {
  const disableTooltip = (event) => {
    event.target.removeEventListener('mouseleave', disableTooltip);
    const active = document.querySelector('.tooltip.active');
    if (active === null) return;
    active.classList.remove('active');
  };

  document.querySelector('body').addEventListener('mouseover', event => {
    if (event.target.matches('.tooltip-trigger')) {
      const target = event.target.dataset.tooltipTarget;
      const targetElement = document.getElementById(`tooltip-${target}`);
      targetElement.classList.add('active');
      event.target.addEventListener('mouseleave', disableTooltip);

      const rect = event.target.getBoundingClientRect();
      targetElement.style.bottom = window.innerHeight - rect.top - 10 + 'px';
      targetElement.style.left = Math.max(
        Math.min(rect.left + rect.width / 2 - 200, window.innerWidth - 400),
        0
      ) + 'px';
    }
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
    enableTooltips();
  }, []);

  const history = useHistory();
  if (!props.exists) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  let content = null;
  if (props.path.length > 0 && props.path[0] === '__results') {
    content = <Results />;
  }
  else if (props.path.length > 0 && props.path[0] === '__changelog') {
    content = <Changelog />;
  }
  else {
    content = <div id="option-list">
      <Option optionKey={props.path.join('/')} topLevel={true} />
    </div>;
  }

  return <div className="App">
    <Navigation />
    <Stats />
    {content}
    <Dialog />
    <Lightbox />
    <div id="overlay"></div>
  </div>;
}

export default connect(state => {
  const pages = [
    '__results',
    '__changelog',
  ];
  const exists = state.path.length === 0 || pages.includes(state.path[0]) ||
    state.options[state.path.join('/')] !== undefined;
  return {
    path: state.path,
    exists,
    disclaimerClosed: state.toggles.disclaimerClosed,
  };
})(App);
