import React from 'react';
import { connect } from 'react-redux';
import getOption from 'Functions/getOption';
import Currencies from './Currencies';
import Warnings from './Warnings';
import PathLink from './PathLink';
import { settings } from 'cyoa';
import deepClone from '../functions/deepClone';
import { getUserText } from '../include/userTexts';

function Stats(props) {
  const linkElements = props.topLevelOptionKeys.map(optionKey =>
    <div className="stats-link" key={optionKey}>
      <PathLink path={optionKey}>{getUserText(optionKey, 'title')}</PathLink>
    </div>
  );

  const pathElements = [];
  const currentTarget = [];

  if (settings.showRoot) {
    pathElements.push(<PathLink
      key={''}
      text="root"
      path={''}
    />);
  }

  for (const part of props.path) {
    currentTarget.push(part);
    const currentKey = currentTarget.join('/');

    if (currentTarget.length > 1 || settings.showRoot) {
      pathElements.push(<div
        className="path-separator"
        key={currentKey + '-separator'}
      >/</div>);
    }

    pathElements.push(<PathLink
      key={currentKey}
      text={getUserText(currentKey, 'title')}
      path={currentKey}
    />);
  }

  // return (
  //   <div className="Stats">
  //     <Currencies currencies={currencies} />
  //     <Warnings />
  //     <div className="path">{pathElements}</div>
  //     <div className="stats-links">{linkElements}</div>
  //   </div>
  // );

  return <div className="Stats">
    <Currencies currencies={props.currencies} />
    <div className="path">{pathElements}</div>
    <div className="stats-links">{linkElements}</div>
  </div>;
}

function mapStateToProps(state) {
  const currencies = deepClone(state.currencies);
  if (state.path.length > 0) {
    const currentTarget = [];
    for (const part of state.path) {
      currentTarget.push(part);
      const currentKey = currentTarget.join('/');
      if (
        state.options[currentKey] !== undefined &&
        state.options[currentKey].currencies !== undefined
      ) {
        Object.assign(currencies, state.options[currentKey].currencies);
      }
    }
  }

  return {
    topLevelOptionKeys: Object.keys(state.options).filter(key => key.match('/') === null),
    path: state.path,
    currencies,
  };
}

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: (next, prev) => JSON.stringify(next) === JSON.stringify(prev),
})(Stats);