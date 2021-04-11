import React from 'react';
import { connect } from 'react-redux';
import { settings } from 'cyoa';
import { getUserText } from '../include/userTexts';
import PathLink from './PathLink';

function Breadcrumbs(props) {
  const pathElements = [];
  const currentTarget = [];

  for (const part of props.path) {
    currentTarget.push(part);
    const currentKey = currentTarget.join('/');

    if (currentTarget.length > 1) {
      pathElements.push(
        <div className="path-separator" key={currentKey + '-separator'}>/</div>
      );
    }

    pathElements.push(
      <PathLink
        key={currentKey}
        text={getUserText(currentKey, 'title')}
        path={currentKey}
      />
    );
  }

  return <div className="Breadcrumbs">{pathElements}</div>;
}

export default connect(state => ({
  path: state.path,
}))(Breadcrumbs);
