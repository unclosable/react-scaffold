import { Button, Modal } from 'antd'

import withStyle from 'react-jss'
import MainLayout from 'component/mainLayout'

import { CONFIGTYPE_SIMPLE, CONFIGTYPE_UPGRADE } from 'component/cloud-control/configConstan'
import ConfigItem from 'component/cloud-control/configItem'
import ValueItem from 'component/cloud-control/valueItem'
import RuleItem from 'component/cloud-control/ruleItem'

const mainLayoutStyle = {
    mainlay: {
        '&>div': {
            margin: '10px 0'
        }
    }
}

class CloudControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configType: void 0,
            configItem: {},
            configItemEntryList: [],
            configItemRuleList: []
        }
    }
    configItemChange = ({ itemKey, app, tn, itemDesc, configType, orgId }) => {
        this.setState({
            configType,
            configItem: {
                itemKey, app, tn, itemDesc, orgId,
                configType: configType == CONFIGTYPE_SIMPLE ? 1 : 2
            }
        })
    }
    configItemEntryListChange = v => {
        const { configType, configItem } = this.state;
        switch (configType) {
            case CONFIGTYPE_SIMPLE: {
                this.setState({ configItem: Object.assign({}, configItem, v), configItemEntryList: [] });
                return;
            }
            case CONFIGTYPE_UPGRADE: {
                this.setState({ configItemEntryList: v, configItem: Object.assign({}, configItem, { currentValue: '' }) });
                return;
            }
        }
    }
    showMe = () => {
        const { configType, configItem, configItemEntryList, configItemRuleList } = this.state;
        let obj = { configItem, configItemEntryList, configItemRuleList };
        if (configType === CONFIGTYPE_SIMPLE) {
        obj.configItemEntryList = [{
            entryValue: configItem.currentValue,
            entryDesc: ''
        }]
        } else if (configType === CONFIGTYPE_UPGRADE) {
            obj.configItem.currentValue = ''
        };
        Modal.info({
            title: '',
            content: JSON.stringify(obj)
        })
    }
    render = () => {
        const { configType, configItem, configItemEntryList } = this.state;
        const { classes } = this.props;
        return <MainLayout className={classes.mainlay}>
            <ConfigItem onChange={this.configItemChange} />
            {!!configType ? <ValueItem type={configType} onChange={this.configItemEntryListChange}
                currentValue={configItem.currentValue} configItemEntryList={configItemEntryList}
            /> : null}
            {!!configType ? <RuleItem onChange={v => this.setState({ configItemRuleList: v })} /> : null}
            {!!configType ? <Button onClick={this.showMe}>show me</Button> : null}
        </MainLayout>
    }
}

export default withStyle(mainLayoutStyle)(CloudControl);