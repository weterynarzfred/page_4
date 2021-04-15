import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'Components/App';
import createStore from 'Include/store';
import { settings } from 'cyoa';

const persisted = JSON.parse(localStorage.getItem('persist:root'));
if (persisted.cyoaId !== `"${settings.cyoaId}"`) {
  localStorage.clear('persist:root');
}

const redirect = (
  <Redirect exact from="/" to={'/' + settings.initialScreen.join('/')} />
);

const { store, persistor } = createStore();

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        {redirect}
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {redirect}
          <Route path="/" component={App} />
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
}
