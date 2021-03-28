import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PathLink from './PathLink';
import SummaryList from './SummaryList';

function Navigation(props) {
  const [opened, setOpened] = useState(false);

  const linkElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    linkElements.push(<div className="navigation-link" key={slug}>
      <PathLink onClick={() => setOpened(false)} path={option.path}>
        {option.title}
      </PathLink>
    </div>);
  }

  return (
    <div className={classNames('Navigation', { opened })}>
      <div id="burger" onClick={() => { setOpened(!opened); }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav id="navigation-menu">
        <div className="navigation-menu-content">
          <div id="navigation-links">
            {linkElements}
          </div>
          <div id="summary-menu">
            <SummaryList
              options={props.options}
              onClick={() => setOpened(false)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(Navigation);