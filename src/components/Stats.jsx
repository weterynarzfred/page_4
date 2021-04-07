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
  let currentTarget = [];

  if (settings.showRoot) {
    pathElements.push(<PathLink
      key={''}
      text="root"
      path={''}
    />);
  }

  for (const part of props.path) {
    if (currentTarget.length > 0 || settings.showRoot) {
      pathElements.push(<div
        className="path-separator"
        key={currentKey + '-separator'}
      >/</div>);
    }

    currentTarget.push(part);
    const currentKey = currentTarget.join('/');

    pathElements.push(<PathLink
      key={currentKey}
      text={getUserText(currentKey, 'title')}
      path={currentKey}
    />);
  }

  // const currencies = deepClone(props.currencies);
  // if (props.path.length > 0) {
  //   const currentOption = getOption(props.path, props.options);
  //   if (currentOption.currencies !== undefined) {
  //     Object.assign(currencies, currentOption.currencies);
  //   }
  // }

  // return (
  //   <div className="Stats">
  //     <Currencies currencies={currencies} />
  //     <Warnings />
  //     <div className="path">{pathElements}</div>
  //     <div className="stats-links">{linkElements}</div>
  //   </div>
  // );

  return <div className="Stats">
    <div className="path">{pathElements}</div>
    <div className="stats-links">{linkElements}</div>
  </div>;
}

export default connect(state => {
  return {
    topLevelOptionKeys: Object.keys(state.options).filter(key => key.match('/') === null),
    // options: state.options,
    path: state.path,
  };
})(Stats);