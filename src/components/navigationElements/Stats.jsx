import React from 'react';
import { connect } from 'react-redux';
import Currencies from '../Currencies';
import Warnings from './Warnings';
import PathLink from '../PathLink';
import Breadcrumbs from './Breadcrumbs';
import { deepClone, deepEquals } from '../../functions/deepFunctions';
import { getUserValue } from '../../include/userValues';
import classNames from 'classnames';

function Stats(props) {
  const linkElements = props.topLevelOptionKeys.map(optionKey => (
    <div className="stats-link" key={optionKey}>
      <PathLink
        path={optionKey}
        className={classNames({
          linkCurrent: optionKey === props.topLevelPath
        })}
      >
        {getUserValue(optionKey, 'title')
        }</PathLink>
    </div>
  ));

  return (
    <div className="Stats">
      <Currencies currencies={props.currencies} />
      <Warnings />
      <Breadcrumbs />
      <div className="stats-links">{linkElements}</div>
    </div>
  );
}

function mapStateToProps(state) {
  const currencies = deepClone(state.currencies);
  if (state.path.length > 0) {
    const currentTarget = [];
    for (const part of state.path) {
      currentTarget.push(part);
      const currentKey = currentTarget.join('/');
      if (state.options[currentKey]?.currencies !== undefined) {
        Object.assign(currencies, state.options[currentKey].currencies);
      }
    }
  }

  const topLevelOptionKeys = Object.keys(state.options).filter(
    key => key.match('/') === null
  );

  return {
    topLevelPath: state.path.length > 0 ? state.path[0] : '',
    topLevelOptionKeys,
    currencies,
  };
}

export default connect(mapStateToProps, null, null, {
  areStatePropsEqual: deepEquals,
})(Stats);
