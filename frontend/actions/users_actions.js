import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user: user
})

export const fetchUser = (user_id) => {
    return function (dispatch) {
        UserAPIUtil.fetchUser(user_id).then((fetched_user) => dispatch(receiveUser(fetched_user)));
    }
}