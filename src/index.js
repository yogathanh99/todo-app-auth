import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import App from './App';
import Loading from './components/UI/Loading';
import GlobalStyles from './utils/global';
import theme from './utils/theme';
import store from './store';

import * as serviceWorker from './serviceWorker';
require('dotenv').config();

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <>
      <Wrapper>
        <Loading />
      </Wrapper>
      <GlobalStyles />
    </>
  </ThemeProvider>,
  document.getElementById('root'),
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <>
            <App />
            <GlobalStyles />
          </>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
