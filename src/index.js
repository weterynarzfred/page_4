import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import App from 'Components/App';
import store from 'Include/store';
import { settings } from 'cyoa';

const redirect = settings.showRoot ? null : (
  <Redirect exact from="/" to={'/' + settings.initialScreen.join('/')} />
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {redirect}
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
