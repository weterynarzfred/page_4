import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import '../scss/index.scss';
import { actions } from '../include/constants';
import Navigation from './Navigation';
import Stats from './navigationElements/Stats';
import Dialog from './Dialog';
import Option from './Option';
import { settings } from 'cyoa';
import Results from './Results';
import Lightbox from './Lightbox';
import Changelog from './Changelog';
import startHoverDetection from './AppFunctions/startHoverDetaction';
import enableTooltips from './AppFunctions/enableTooltips';
import showDisclaimer from './AppFunctions/showDisclaimer';
import GoUpButton from './GoUpButton';

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

  useEffect(() => {
    if
      (process.env.NODE_ENV === 'development' ||
      props.disclaimerClosed ||
      settings.disclaimer === undefined
    ) return;
    showDisclaimer(props.dispatch);
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
      <GoUpButton path={props.path} />
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
