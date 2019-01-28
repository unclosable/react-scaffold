import react_dom from 'react-dom'
//router
import createHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

// import MianRoute from './route/mainRouter.jsx'
import View from 'view'
//redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { stores } from 'store' //MY STORE
import { ThemeProvider } from 'react-jss'
//component

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(combineReducers(Object.assign({}, { router: routerReducer }, stores)),
    applyMiddleware(middleware));

// console.log(ConnectedRouter)
// const store = createStore(
//     combineReducers({
//         ...stores,
//         routing: routerReducer
//     })
// )

// const history = syncHistoryWithStore(createHistory(), store)

const globalTheme = {
    maxWidth: '16.8rem',
    backgroundColor: '#FAFAFA'
}

//App
class App extends React.Component {
    render() {
        return <ThemeProvider theme={globalTheme}>
            <Provider store={store}>
                <ConnectedRouter store={store} history={history}>
                    <Route component={View} />
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>;
    }
}
const renderFun = () => {
    react_dom.render(<App />, document.getElementById("root"));
}
export { renderFun, App };
