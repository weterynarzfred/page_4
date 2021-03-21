import React from 'react';
import { connect } from 'react-redux';
import Currencies from 'Components/Currencies';
import Warnings from 'Components/Warnings';
import PathLink from './PathLink';

function Stats(props) {
  const pathElements = [
    <PathLink
      key=''
      text="home"
      path={''}
    />
  ];

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