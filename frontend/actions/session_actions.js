import * as APIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
});

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors: errors
});

export const clearErrors = (errors = []) => ({
  type: CLEAR_ERRORS,
  errors: errors
})

export const clearErrorsFunction = () => {
  return function (dispatch) {
    dispatch(clearErrors());
  }
}

export const login = (user) => {
    return function (dispatch) {
        APIUtil.login(user).then(loggedinuser => (
            dispatch(receiveCurrentUser(loggedinuser) )
          ), err => (
            dispatch(receiveErrors(err.responseJSON))
          ))
    }
};

export const signup = user => dispatch => (
    APIUtil.signup(user).then(user => (
      dispatch(receiveCurrentUser(user))
    ), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const logout = () => {
    return function (dispatch) {
        APIUtil.logout().then(user => (
            dispatch(receiveCurrentUser(null))
          ))
    }
};

