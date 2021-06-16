import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { settings } from 'cyoa';
import SummaryList from './SummaryList';
import { actions } from '../include/constants';
import { useHistory } from 'react-router';
import Settings from './Settings';

function handleRestart(history, setOpened) {
  if (settings.initialScreen === undefined) {
    history.push('/');
  }
  else {
    history.push('/' + settings.initialScreen.join('/'));
  }
  setOpened(false);

  this.dispatch({
    type: actions.RESTART,
  });
}

function Navigation(props) {
  const [opened, setOpened] = useState(false);
  const history = useHistory();

  let credits = null;
  if (settings.author !== undefined) {
    credits = <div className="navigation-credits">
      made by: {settings.author}
    </div>;
    if (settings.authorLink !== undefined) {
      credits = <div className="navigation-credits">
        made by: <a href={settings.authorLink}>{settings.author}</a>
      </div>;
    }
  }

  return <div className={classNames('Navigation', { opened })}>
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
        <div id="summary-menu">
          <div className="navigation-title">Table of Contents</div>
          <SummaryList
            onClick={() => setOpened(false)}
            hideSelectable={true}
          />
        </div>
        <Settings />
      </div>
      {credits}
    </nav>
  </div>;
}

export default connect()(Navigation);
