import { Card, Form, Select, Input } from 'antd'

const { Option } = Select;

import { CONFIGTYPE_SIMPLE, CONFIGTYPE_UPGRADE } from 'component/cloud-control/configConstan'
class ConfigItem extends React.Component {
    formChange = e => {
        e.preventDefault();
        const { onChange = () => { } } = this.props;
        onChange(this.props.form.getFieldsValue());
    }
    selectChange = v => {
        const { onChange = () => { } } = this.props;
        onChange(Object.assign({}, this.props.form.getFieldsValue(), { configType: v }));
    }
    render = () => {
        const { getFieldDecorator } = this.props.form;
        return <Card title="基础设定" bordered={false} >
            <Form onChange={this.formChange}>
                <Form.Item label="KEY" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('itemKey', {
                        rules: [{ required: true, message: 'required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="APP" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('app', {
                        rules: [{ required: true, message: 'required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="ORG" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('orgId', {
                        rules: [{ required: true, message: 'required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="TN" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('tn', {
                        rules: [{ required: true, message: 'required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="DESC" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('itemDesc', {
                        rules: [{ required: true, message: 'required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="config type" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    {getFieldDecorator('configType', {
                        rules: [{ required: true, message: 'Please select your config type' }],
                    })(
                        <Select placeholder="Select a type" onChange={this.selectChange}>
                            <Option value={CONFIGTYPE_SIMPLE}>SIMPLE</Option>
                            <Option value={CONFIGTYPE_UPGRADE}>UPGRADE</Option>
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Card>
    }
}
export default Form.create()(ConfigItem);