import react_dom from 'react-dom'
//router
import createHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

// import MianRoute from './route/mainRouter.jsx'
import View from 'view'
//redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { stores } from 'store' //MY STORE
import { ThemeProvider } from 'react-jss'
//component

const store = createStore(
    combineReducers({
        ...stores,
        routing: routerReducer
    })
)

const history = syncHistoryWithStore(createHistory(), store)

const globalTheme = {
    maxWidth: '16.8rem',
    backgroundColor: '#FAFAFA'
}

//App
class App extends React.Component {
    render() {
        return <ThemeProvider theme={globalTheme}>
            <Provider store={store}>
                <Router history={history}>
                    <Route component={View} />
                </Router>
            </Provider>
        </ThemeProvider>;
    }
}
const renderFun = () => {
    react_dom.render(<App />, document.getElementById("root"));
}
export { renderFun, App };