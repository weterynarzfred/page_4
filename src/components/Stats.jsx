import React from 'react';
import { connect } from 'react-redux';
import getOption from 'Functions/getOption';
import Currencies from './Currencies';
import Warnings from './Warnings';
import PathLink from './PathLink';
import { settings } from 'cyoa';
import deepClone from '../functions/deepClone';

function Stats(props) {

  const linkElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    linkElements.push(<div className="stats-link" key={slug}>
      <PathLink path={option.path}>{option.title}</PathLink>
    </div>);
  }

  const pathElements = [];
  let pathTarget = [];

  if (settings.showRoot) {
    pathElements.push(<PathLink
      key={''}
      text="root"
      path={''}
    />);
  }

  for (const part of props.path) {
    if (pathTarget.length > 0 || settings.showRoot) {
      pathElements.push(<div
        className="path-separator"
        key={pathTarget.join('.') + '-separator'}
      >/</div>);
    }
    pathTarget.push(part);
    const currentOption = getOption(pathTarget, props.options);
    pathElements.push(<PathLink
      key={pathTarget.join('.')}
      text={currentOption.title}
      path={pathTarget.join('.')}
    />);
  }

  const currencies = deepClone(props.currencies);
  if (props.path.length > 0) {
    const currentOption = getOption(props.path, props.options);
    if (currentOption.currencies !== undefined) {
      Object.assign(currencies, currentOption.currencies);
    }
  }

  return (
    <div className="Stats">
      <Currencies currencies={currencies} />
      <Warnings />
      <div className="path">{pathElements}</div>
      <div className="stats-links">{linkElements}</div>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
  path: state.path,
}))(Stats);