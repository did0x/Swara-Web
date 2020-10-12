import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import * as serviceWorker from './serviceWorker'; // UNCOMMENT FOR PWA

// COMPONENT & OTHER
import 'assets/scss/index.scss';
import Main from 'base/Main';

// REDUX
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'redux/reducers';

// SET REDUX STORE
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

// SET DEFAULT AXIOS
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

if (process.env.REACT_APP_USE_TOKEN === 'true') {
    var token = window.localStorage.getItem('token');
    axios.defaults.headers[process.env.REACT_APP_TOKEN_HEADER_NAME] = token;
}

// SET AXIOS INTERCEPTOR
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    const config = {
        method: error?.response?.config?.method,
        status_code: error?.response?.status,
        endpoint: error?.response?.request?.responseURL
    };
    
    const { method, status_code, endpoint } = config;

    // Run only on production
    if (process.env.NODE_ENV === "production") {
        console.log("ERROR ON PRODUCTION");
        console.log(`${method} ${status_code} ${endpoint}`);
    }

    return Promise.reject(error);
});

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Main />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


// serviceWorker.unregister(); // UNCOMMENT TO REMOVE PWA || COMMENT THE REGISTER
// serviceWorker.register(); // UNCOMMENT FOR PWA