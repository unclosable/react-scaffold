import { withStore } from 'store'
import { Route, Switch } from 'react-router-dom'

import Test from 'view/test'


class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <Switch>
            <Route component={Test} />
        </Switch>

    }
}


export default withStore(MainRouter);
