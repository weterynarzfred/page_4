import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import createStore from './include/store';
import { settings } from 'cyoa';

const persisted = JSON.parse(localStorage.getItem('persist:root'));
if (persisted !== null && persisted.cyoaId !== `"${settings.cyoaId}"`) {
  localStorage.clear('persist:root');
}

const { store, persistor } = createStore();

const initialPath = '/' + settings.initialScreen.join('/');
const router = <Router>
  <Route exact path="/" render={() => <Redirect to={initialPath} />} />
  <Route path="/" component={App} />
</Router>;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>{router}</PersistGate>
  </Provider>,
  document.getElementById('root')
);