import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import throttle from 'lodash/throttle';
import theme from './themes';

import { loadState, saveState } from './helpers/localStorage';
import reducers from './reducers';

import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import './index.css';

const persistedState = loadState();

export const store = createStore(
    reducers,
    persistedState,
    compose(applyMiddleware(thunk))
);

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);
