import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'Src/scss/index.scss';
import Navigation from './Navigation';
import Stats from './Stats';
import { actions } from '../include/constants';
import deepClone from '../functions/deepClone';
// import Dialog from './Dialog';
import Option from './Option';

function App(props) {
  // TODO: add an event listener
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
  });

  return <div className="App">
    <Navigation />
    <Stats />
    <Option optionKey={props.path.join('/')} />
    {/* <Dialog /> */}
    <div id="overlay" style={{ backgroundImage: "url('./images/general/001_RV_TEXTURE_DIRT.png')" }}></div>
  </div>;
}

export default connect(state => ({
  path: state.path
}))(App);