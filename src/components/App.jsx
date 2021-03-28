import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'Src/scss/index.scss';
import getOption from 'Functions/getOption';
import Navigation from './Navigation';
import OptionList from './OptionList';
import Stats from './Stats';
import { actions } from '../include/enum';
import deepClone from '../functions/deepClone';

function App(props) {
  useEffect(() => {
    const currentPath = props.location.pathname.split('/')
      .filter(e => e !== '');
    if (currentPath.join('.') !== props.path.join('.')) {
      window.scrollTo(0, 0);
      props.dispatch({
        type: actions.CHANGE_PATH,
        path: currentPath,
      });
    }
  });

  const currencies = deepClone(props.currencies);

  let currentOptions = {};
  if (props.path.length > 0) {
    const currentPath = [];
    for (let i = 0; i < props.path.length; i++) {
      currentPath.push(props.path[i]);
      const currentOption = getOption(currentPath, props.options);
      if (currentOption === undefined) return null;
      if (currentOption.currencies !== undefined) {
        Object.assign(currencies, deepClone(currentOption.currencies));
      }
    }

    const mainOption = getOption(props.path, props.options);
    currentOptions[mainOption.slug] = mainOption;
  } else {
    currentOptions = props.options;
  }

  return (
    <div className="App">
      <Navigation />
      <Stats currencies={currencies} />
      <OptionList currentOptions={currentOptions} currencies={currencies} />
    </div>
  );
}

export default connect(state => ({
  path: state.path,
  options: state.options,
  currencies: state.currencies,
}))(App);