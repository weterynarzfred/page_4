import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
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
import { useSelector } from 'react-redux';

function App(props) {
  const location = useLocation();
  const currentPath = location.pathname.split('/')
    .filter(e => e !== '');

  const lastScroll = useSelector(state => state.options[currentPath.join('/')]?.lastScroll);

  useEffect(() => {
    if (currentPath.join('/') === props.path.join('/')) return;

    const currentScroll = window.scrollY;

    props.dispatch({
      type: actions.CHANGE_PATH,
      path: currentPath,
      lastScroll: currentScroll,
    });
  }, [currentPath]);

  useEffect(() => {
    if (lastScroll === undefined) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, lastScroll);
    }
  }, [props.path]);

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


  const navigate = useNavigate();
  if (!props.exists) {
    setTimeout(() => {
      navigate('/');
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

export default connect((state) => {
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
