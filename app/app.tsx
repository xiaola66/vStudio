import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak, { KeycloakConfig } from 'keycloak-js';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import 'public/iconfont/iconfont.js';

// Import Language Provider
// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from 'i18n';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

const keycloakCfg: KeycloakConfig = {
  realm: process.env.KEYCLOAK_REALM || '',
  url: process.env.KEYCLOAK_URL,
  clientId: process.env.KEYCLOAK_CLIENT_ID || '',
};

const keycloak = new Keycloak(keycloakCfg);

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const render = (messages: any, Component = App) => {
  ReactDOM.render(
    <Provider store={store}>
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={{
          onLoad: 'login-required',
          checkLoginIframe: false,
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
          promiseType: 'native',
        }}
      >
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <Component />
          </ConnectedRouter>
        </LanguageProvider>
      </KeycloakProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['./i18n', './containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // tslint:disable-next-line:max-line-length
    const App = require('./containers/App').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(translationMessages, App);
  });
}
render(translationMessages);
