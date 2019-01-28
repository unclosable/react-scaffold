import { withStore } from 'store'
import { Route, Switch } from 'react-router-dom'
import withStyle from 'react-jss'


import { Layout, Icon } from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
import Menu from 'component/menu'

import Test from 'view/test'
import CloudControl from 'view/cloud-control'
const mainStyle = {
    main: {
        minHeight: '100%'
    },
    sider: {
        overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
    },
    content: {
        margin: '24px 16px 0', overflow: 'initial'
    },
    footer: {
        textAlign: 'center'
    }
}

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { classes } = this.props;
        return <Layout className={classes.main}>
            <Sider className={classes.sider}>
                <div className="logo" />
                <Menu />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content className={classes.content}>
                    <Switch>
                        <Route path="/oh-my-test" component={Test} />
                    </Switch>
                </Content>
                <Footer className={classes.footer}>
                    MANAGE MY ASS SYSTEM ©2019 Created by unclosable
                </Footer>
            </Layout>
        </Layout>

    }
}


export default withStore(withStyle(mainStyle)(MainRouter));
