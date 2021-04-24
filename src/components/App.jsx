import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'Src/scss/index.scss';
import { actions } from '../include/constants';
import Navigation from './Navigation';
import Stats from './Stats';
import Dialog from './Dialog';
import Option from './Option';
import { useHistory } from 'react-router';
import { settings } from 'cyoa';

function App(props) {
  useEffect(() => {
    const currentPath = props.location.pathname.split('/')
      .filter(e => e !== '');
    if (currentPath.join('/') !== props.path.join('/')) {
      window.scrollTo(0, 0);
      props.dispatch({
        type: actions.CHANGE_PATH,
        path: currentPath,
      });
    }
  }, [props.location.pathname]);

  // skip the displaimer in development
  if (process.env.NODE_ENV !== 'development') {
    useEffect(() => {
      if (!props.disclaimerClosed && settings.disclaimer !== undefined) {
        window.dispatchEvent(new CustomEvent('dialogOpen', {
          detail: {
            title: 'Disclaimer',
            text: settings.disclaimer,
            buttons: [
              {
                onClick: () => {
                  props.dispatch({
                    type: actions.TOGGLE,
                    key: 'disclaimerClosed',
                  });
                },
                text: 'ok',
              }
            ],
          }
        }));
      }
    }, []);
  }

  const history = useHistory();
  if (!props.exists) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  return <div className="App" style={{ backgroundImage: "url('/images/general/pattern.png')" }}>
    <Navigation />
    <Stats />
    <div id="option-list">
      <Option optionKey={props.path.join('/')} topLevel={true} />
    </div>
    <Dialog />
    <div id="overlay" style={{ backgroundImage: "url('/images/general/001_RV_TEXTURE_DIRT.png')" }}></div>
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
