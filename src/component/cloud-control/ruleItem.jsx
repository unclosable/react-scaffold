import { Card, Button, Form, Select, Input, Icon } from 'antd'
import withStyle from 'react-jss'

import VersionConponent from 'component/cloud-control/operations/vn'
import OperatingSystemComponent from 'component/cloud-control/operations/os'

const { Option } = Select;
const conditionType = {
    card: {
        margin: '10px 0'
    }
}

class Condition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: void 0,
            conditions: []
        }
    }
    _onChange = () => {
        const { type, conditions } = this.state;
        const { onChange = () => { } } = this.props;
        onChange({ type, conditions });
    }
    selectChange = v => {
        let theRule = getRuleSetting(v);
        let nexState = { type: v, conditions: [theRule.initData()] }
        this.setState(nexState, () => this._onChange());
    }
    addCondition = () => {
        const { type, conditions } = this.state;
        let theRule = getRuleSetting(type);
        this.setState({ conditions: [...conditions, theRule.initData()] }, () =>
            this._onChange())
    }
    rmCondition = i => {
        const { conditions } = this.state;
        let _conditions = [...conditions];
        return () => {
            _conditions.splice(i, 1);
            this.setState({ conditions: _conditions }, () =>
                this._onChange())
        }
    }
    conditionChange = i => {
        const { conditions } = this.state;
        let _conditions = [...conditions];
        return value => {
            _conditions[i] = value;
            this.setState({ conditions: _conditions }, () =>
                this._onChange())
        }
    }
    render = () => {
        const { rmRule, allRules, classes, type, conditions } = this.props;
        // const { type, conditions } = this.state;
        let Conponent, conponentCouldRepeat;
        if (!!type) {
            let theRule = getRuleSetting(type);
            Conponent = theRule.conponent;
            conponentCouldRepeat = theRule.conponentCouldRepeat;
        }

        return <Card className={classes.card} title={<Icon type="close-circle" onClick={rmRule} />}>
            <Form>
                <Form.Item label="rule type" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    <Select placeholder="Select a type" onChange={this.selectChange} value={type}>
                        {rulesList.filter(({ type }) => {
                            //条件互斥处理，先不实现吧……
                            // console.log(type, !!!(allRules.find((exRule) => exRule.type === type)))
                            // return !!!(allRules.find((exRule) => exRule.type === type));
                            return true;
                        }).map(({ type }, i) => <Option value={type} key={`rules-${i}`}>{type}</Option>)}
                    </Select>
                </Form.Item>
                {Conponent ? conditions.map((con, i) => <Conponent key={`co-${i}`}
                    onChange={this.conditionChange(i)}
                    rmCondition={this.rmCondition(i)}
                    {...con} />) : null}
                {/* {!!conponentCouldRepeat ? <Button type="primary" block onClick={this.addCondition}>添加条件</Button> : null} */}
            </Form>
        </Card>
    }
}

const ConditionWithStyle = withStyle(conditionType)(Condition)

const getRuleSetting = t => {
    return rulesList.find(({ type }) => type === t);
}

const rulesList = [
    {
        type: 'modulo',
        typeCouldRepeat: true,
        conponentCouldRepeat: false,
        initData: () => ({ moduloKey: '', value: '' }),
        conponent: ({ moduloKey, value, onChange }) => <div>
            <Form.Item label="modulo Key" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Input onChange={e => onChange({ moduloKey: e.target.value, value })} value={moduloKey} />
            </Form.Item>
            <Form.Item label="modulo values" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                help={`use half size ',' separate each data`}>
                <Input onChange={e => onChange({ moduloKey, value: e.target.value })} value={value} />
            </Form.Item>
        </div>
    },
    {
        type: 'vn',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: VersionConponent
    },
    {
        type: 'os',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: OperatingSystemComponent
    },
    {
        type: 'ovn',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: OperatingSystemComponent
    },
    {
        type: 'net',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: OperatingSystemComponent
    },
    {
        type: 'dy',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: VersionConponent
    },
    {
        type: 'tm',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: VersionConponent
    },
    {
        type: 'wnd',
        typeCouldRepeat: false,
        conponentCouldRepeat: true,
        initData: () => ({ select: void 0, value: '', includeValue: void 0, excludeValue: void 0 }),
        conponent: VersionConponent
    }]

class RuleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rules: []
        }
    }
    addRule = () => {
        const { onChange } = this.props;
        const { rules } = this.state;
        this.setState({ rules: [...rules, {}] }, () =>
            onChange(rulesTransition(this.state.rules)))
    }
    rulesChange = i => {
        const { onChange } = this.props;
        const { rules } = this.state;
        let _rules = [...rules];
        return (rule) => {
            _rules[i] = rule;
            this.setState({ rules: _rules }, () =>
                onChange(rulesTransition(this.state.rules)))
        }
    }
    rmRule = i => {
        const { onChange } = this.props;
        return () => {
            const { rules } = this.state;
            let _rules = [...rules];
            _rules.splice(i, 1)
            this.setState({ rules: _rules }, () =>
                onChange(rulesTransition(this.state.rules)))
        }
    }
    render = () => {
        const { rules } = this.state;
        return <Card title="条件设定" bordered={false} >
            {rules.map((item, i) => <ConditionWithStyle key={i} onChange={this.rulesChange(i)}
                allRules={rules}
                rmRule={this.rmRule(i)} {...item} />)}
            <Button type="primary" block onClick={this.addRule}>添加</Button>
        </Card>
    }
}


const rulesTransition = (rules) => {
    return rules.map(({ type, conditions }) => {
        if (type === 'modulo') {
            return {
                basicItemKey: type,
                configItemRuleEntryList: moduloConditionHandler(conditions[0]),
                express: 40,
                enableExclude: 0
            }
        } else if (!!type && !!conditions.find(({ select }) => select == 10)) {
            return {
                basicItemKey: type,
                configItemRuleEntryList: includConditionHandler(conditions[0]),
                express: conditions[0].select,
                enableExclude: (!!conditions[0].excludeValue || !!conditions[0].includeValue) ? 1 : 0
            }
        } else if (!!type) {
            return {
                basicItemKey: type,
                configItemRuleEntryList: conditionHandler(conditions[0]),
                express: conditions[0].select,
                enableExclude: (!!conditions[0].excludeValue || !!conditions[0].includeValue) ? 1 : 0
            }
        } else {
            return {}
        }
    })
}

const moduloConditionHandler = condition => {
    return {
        entryType: 1,
        entryText: JSON.stringify({ key: condition.moduloKey, value: condition.value })
    }
}

const includConditionHandler = condition => {
    return {
        entryType: 3,
        entryText: JSON.stringify(condition.value.split(',').map(( v ) => ({ value: v })))
    }
}

const conditionHandler = condition => {
    let simple, exclude, include;
    simple = {
        entryType: 0,
        entryText: JSON.stringify({ value: condition.value })
    };
    if (!!condition.includeValue) {
        include = {
            entryType: 3,
            entryText: JSON.stringify(condition.includeValue.split(',').map(s => ({ value: s })))
        }
    }
    if (!!condition.excludeValue) {
        exclude = {
            entryType: 2,
            entryText: JSON.stringify(condition.excludeValue.split(',').map(s => ({ value: s })))
        }
    }
    let re = [simple];
    if (exclude) re.push(exclude);
    if (include) re.push(include);
    return re;

}

export default RuleItem