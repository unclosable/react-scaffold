import { Card, Button, Form, Select, Input, Icon, Checkbox } from 'antd'
import withStyle from 'react-jss'

const { Option } = Select;
const vn = [{
    text: '等于',
    value: '0',
}, {
    text: '不等于',
    value: '1',
}, {
    text: '大于',
    value: '2',
}, {
    text: '大于等于',
    value: '3',
}, {
    text: '小于',
    value: '4',
}, {
    text: '小于等于',
    value: '5',
    // }, {
    //     text: '不包含',
    //     value: 11,
    //     help: `list data, use half size ',' separate each data`
    // }, {
    //     text: '包含',
    //     value: 10,
    //     help: `list data, use half size ',' separate each data`
}]

const vnStyle = {
    div: {
        border: '0px solid #e8e8e8',
        margin: '10px 0',
        padding: '30px 0 0 0',
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: '10%',
        zIndex: 1
    }
}

class Version extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            include: false,
            exclude: false
        }
    }
    selectChange = v => {
        const { select, value, includeValue, excludeValue, onChange } = this.props;
        onChange({ select: v, value, includeValue, excludeValue })
    }
    valueChange = e => {
        const { select, value, includeValue, excludeValue, onChange } = this.props;
        onChange({ select, value: e.target.value, includeValue, excludeValue })
    }
    includeValueChange = v => {
        const { select, value, includeValue, excludeValue, onChange } = this.props;
        onChange({ select, value, includeValue: v.target.value, excludeValue })
    }
    excludeValueChange = v => {
        const { select, value, includeValue, excludeValue, onChange } = this.props;
        onChange({ select, value, includeValue, excludeValue: v.target.value })
    }

    render() {
        const { rmCondition, select, value, includeValue, excludeValue, classes } = this.props;
        const { include, exclude } = this.state;
        return <div className={classes.div}>
            {/* <Icon type="close-circle" className={classes.icon} onClick={rmCondition} /> */}
            <Form.Item label="operation" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Select placeholder="Select a operation" onChange={this.selectChange} value={select}>
                    {vn.map(({ text, value }, i) => <Option value={value} key={i}>{text}</Option>)}
                </Select>
            </Form.Item>
            {!!select ? <Form.Item label="value" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                help={vn.find((item) => item.value === select).help}>
                <Input value={value} onChange={this.valueChange} />
            </Form.Item> : null}
            {!!select ? <Form.Item label=" " labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Checkbox
                    checked={include}
                    onChange={e => this.setState({ include: e.target.checked })}
                >include</Checkbox><Checkbox
                    checked={exclude}
                    onChange={e => this.setState({ exclude: e.target.checked })}
                >exclude</Checkbox>
            </Form.Item> : null}
            {include ? <Form.Item label="include" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                help={`list data, use half size ',' separate each data`}>
                <Input value={includeValue} onChange={this.includeValueChange} />
            </Form.Item> : null}
            {exclude ? <Form.Item label="exclude" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                help={`list data, use half size ',' separate each data`}>
                <Input value={excludeValue} onChange={this.excludeValueChange} />
            </Form.Item> : null}
        </div>
    }
}

export default withStyle(vnStyle)(Version);