import React from 'react';
import { connect } from 'react-redux';
import Currencies from './Currencies';
import Warnings from './Warnings';
import PathLink from './PathLink';

function Stats(props) {
  const pathElements = [];

  let pathTarget = [];
  for (const part of props.path) {
    pathElements.push(<div
      className="path-separator"
      key={pathTarget.join('.') + '-separator'}
    >/</div>);
    pathTarget.push(part);
    pathElements.push(<PathLink
      key={pathTarget.join('.')}
      text={part}
      path={pathTarget.join('.')}
    />);
  }

  return (
    <div className="Stats">
      <Currencies currencies={props.currencies} />
      <Warnings />
      <div className="path">{pathElements}</div>
    </div>
  );
}

export default connect(state => ({
  currencies: state.currencies,
  path: state.path,
}))(Stats);