import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'Src/scss/index.scss';
import { actions } from '../include/constants';
import Navigation from './Navigation';
import Stats from './Stats';
import Dialog from './Dialog';
import Option from './Option';

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

export default connect(state => ({
  path: state.path
}))(App);
