import React from 'react';
import { connect } from 'react-redux';
import { getUserValue } from '../../include/userValues';
import PathLink from '../PathLink';

function Breadcrumbs(props) {
  const pathElements = [];
  const currentTarget = [];

  for (const part of props.path) {
    currentTarget.push(part);
    const currentKey = currentTarget.join('/');

    const title = getUserValue(currentKey, 'title');

    if (title !== '') {
      if (pathElements.length > 0) {
        pathElements.push(
          <div className="path-separator" key={currentKey + '-separator'}>/</div>
        );
      }

      pathElements.push(
        <PathLink
          key={currentKey}
          optionKey={currentKey}
          path={currentKey}
        />
      );
    }
  }

  return <div className="Breadcrumbs">{pathElements}</div>;
}

export default connect(state => ({
  path: state.path,
}))(Breadcrumbs);
