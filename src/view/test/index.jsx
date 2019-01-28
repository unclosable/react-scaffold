import { Switch, Route } from "react-router-dom"

import Test1 from './test1';

import Test2 from './test2';
class CloudControlIndex extends React.Component {
    render = () => {
        const { match } = this.props;
        return <Switch>
            <Route path={`${match.path}/test1`} component={Test1} />
            <Route path={`${match.path}/test2`} component={Test2} />
        </Switch>
    }
}

export default CloudControlIndex;
