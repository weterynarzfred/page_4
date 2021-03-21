import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PathLink from './PathLink';

function Navigation(props) {
  const [opened, setOpened] = useState(false);

  const linkElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    linkElements.push(<div className="navigation-link" key={slug}>
      <PathLink
        onClick={() => setOpened(false)}
        text={option.title}
        path={option.path.join('.')}
      />
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
        <div id="navigation-links">
          {linkElements}
        </div>
      </nav>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(Navigation);