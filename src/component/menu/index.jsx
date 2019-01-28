import { Layout, Menu, Icon } from 'antd';
import { withStore } from 'store'
const SubMenu = Menu.SubMenu;

class MainMenu extends React.Component {
    render() {
        const { PUSH } = this.props//PUSH函数
        return <Menu theme="dark" mode="inline" >
            <SubMenu key="sub1" title={<span><Icon type="build" /><span>oh my test</span></span>}>
                <Menu.Item key="3" onClick={() => PUSH('/oh-my-test/test1')}>
                    <Icon type="upload" />
                    <span className="nav-text">test1</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => PUSH('/oh-my-test/test2')}>
                    <Icon type="bar-chart" />
                    <span className="nav-text">test2</span>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="1" onClick={() => PUSH('/test')}>{/* onclick跳转 */}
                <Icon type="user" />
                <span className="nav-text">有的没的</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => PUSH('/cloud-control')} >
                <Icon type="video-camera" />
                <span className="nav-text">有的没的</span>
            </Menu.Item>
        </Menu>
    }
}

export default withStore(MainMenu)//绑定PUSH事件
