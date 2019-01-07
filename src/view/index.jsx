import { withStore } from 'store'
import { Route, Switch } from 'react-router-dom'
import withStyle from 'react-jss'


import { Layout, Menu, Icon } from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;

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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="bar-chart" />
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="cloud-o" />
                        <span className="nav-text">nav 5</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="appstore-o" />
                        <span className="nav-text">nav 6</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="team" />
                        <span className="nav-text">nav 7</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="shop" />
                        <span className="nav-text">nav 8</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content className={classes.content}>
                    <Switch>
                        <Route component={CloudControl} />
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
