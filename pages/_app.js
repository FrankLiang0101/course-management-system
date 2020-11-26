import React from 'react';
import { Provider } from 'react-redux';
import { makeServer } from '../mock-server/mirage';
import createStore from '../store/';
import '../styles/antd.css';

makeServer({ environment: 'development' });

function MyApp({ Component, pageProps }) {
  const store = createStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
