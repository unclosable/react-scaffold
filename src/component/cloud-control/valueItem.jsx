import { Card, Form, Select, Input, Button, Icon } from 'antd'
import withStyle from 'react-jss'
const { Option } = Select;

import { CONFIGTYPE_SIMPLE, CONFIGTYPE_UPGRADE } from 'component/cloud-control/configConstan'


class SimpleValueInput extends React.Component {
    inputChange = v => {
        const { onChange = () => { } } = this.props;
        onChange({ currentValue: v.target.value })
    }
    render = () => {
        const { currentValue } = this.props;
        return <div>
            <Form.Item label="current value" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Input onChange={this.inputChange} value={currentValue} />
            </Form.Item>
        </div>
    }
}
const itemStyle = {
    mainDiv: {
        margin: '10px 0',
        padding: '10px 0',
        border: '1px solid #e8e8e8'
    },
    icon: {
        position: 'absolute',
        left: '5%',
        zIndex: 1
    }
}
class UpgradeItem extends React.Component {
    entryDescChange = e => {
        const { entryDesc, entryValue, onChange } = this.props;
        onChange({ entryDesc: e.target.value, entryValue })
    }
    entryValueChange = e => {
        const { entryDesc, entryValue, onChange } = this.props;
        onChange({ entryDesc, entryValue: e.target.value })
    }
    render = () => {
        const { entryDesc, entryValue, rm, classes } = this.props;
        return <div className={classes.mainDiv}>
            <Icon type="close-circle" className={classes.icon} onClick={rm} />
            <Form.Item label="entry desc" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Input value={entryDesc} onChange={this.entryDescChange} />
            </Form.Item>
            <Form.Item label="entry value" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                help={`JSON formate data`}>
                <Input value={entryValue} onChange={this.entryValueChange} />
            </Form.Item>
        </div>
    }
}
const UpgradeItemWithStyle = withStyle(itemStyle)(UpgradeItem)

class UpgradeValueInput extends React.Component {
    addEntry = () => {
        const { configItemEntryList, onChange } = this.props;
        onChange([...configItemEntryList, {}])
    }
    itemChange = i => {
        const { configItemEntryList, onChange } = this.props;
        return item => {
            let _list = [...configItemEntryList];
            _list[i] = item;
            onChange(_list)
        }
    }
    rmItem = i => {
        const { configItemEntryList, onChange } = this.props;
        return () => {
            let _list = [...configItemEntryList];
            _list.splice(i, 1)
            onChange(_list)
        }
    }
    render = () => {
        const { configItemEntryList } = this.props;
        return <div>
            {configItemEntryList.map((item, i) => <UpgradeItemWithStyle key={i}
                onChange={this.itemChange(i)} rm={this.rmItem(i)} {...item} />)}
            <Button onClick={this.addEntry}>add</Button>
        </div>
    }
}
class ValueItem extends React.Component {
    render = () => {
        const { currentValue, configItemEntryList, type, onChange } = this.props;
        let ValueInput;
        switch (type) {
            case CONFIGTYPE_SIMPLE: {
                ValueInput = SimpleValueInput;
                break;
            }
            case CONFIGTYPE_UPGRADE: {
                ValueInput = UpgradeValueInput;
                break;
            }
        }
        return <Card title="返回值设定" bordered={false} >
            <ValueInput onChange={onChange} currentValue={currentValue} configItemEntryList={configItemEntryList} />
        </Card>
    }
}
export default ValueItem;