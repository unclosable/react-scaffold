import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { testAction } from 'store/test';
const stores = { testAction };

//链接跳转
const PUSH = dispatch => (url, search) => {
    dispatch(push(url, { search }))
}

const withStore =
    (component, stateHandler = () => ({})) =>
        connect(stateHandler,
            (dispatch, ownProps) => {
                return {
                    PUSH: PUSH(dispatch)
                }
            })(component)



export {
    stores, withStore
}