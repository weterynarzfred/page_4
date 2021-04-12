import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { settings } from 'cyoa';
import SummaryList from './SummaryList';
import { actions } from '../include/constants';
import { useHistory } from 'react-router';

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
          <SummaryList
            onClick={() => setOpened(false)}
          />
        </div>
      </div>
    </nav>
  </div>;

}

export default connect()(Navigation);
