import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { settings } from 'cyoa';
import PathLink from './PathLink';
import SummaryList from './SummaryList';
import { actions } from '../include/constants';
import { useHistory } from 'react-router';
import getProp from './../functions/getProp';

function handleRestart(history, setOpened) {
  if (settings.initialScreen === undefined) {
    history.push('/');
  }
  else {
    history.push(settings.initialScreen.join('/'));
  }
  setOpened(false);

  this.dispatch({
    type: actions.RESTART,
  });
}

function Navigation(props) {
  const [opened, setOpened] = useState(false);
  const history = useHistory();

  const linkElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    linkElements.push(<div className="navigation-link" key={slug}>
      <PathLink onClick={() => setOpened(false)} path={option.path}>
        {getProp('title', option)}
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
          <button id="restart-button" onClick={() => {
            window.dispatchEvent(new CustomEvent('dialogOpen', {
              detail: {
                title: 'Restart',
                text: <p>Are you sure you want to start over?</p>,
                buttons: [
                  {
                    onClick: handleRestart.bind(props, history, setOpened),
                    text: 'restart',
                  }
                ],
              }
            }));
          }}>restart</button>
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