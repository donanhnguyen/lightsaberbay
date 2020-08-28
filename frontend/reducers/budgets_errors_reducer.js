import {RECEIVE_BUDGET_ERRORS, RESET_BUDGET_ERRORS} from '../actions/budget_actions';
import merge from 'lodash/merge';

const budgetsErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_BUDGET_ERRORS:
            return action.errors;
        case RESET_BUDGET_ERRORS:
            return {};
        default:
            return state;
    }
};

export default budgetsErrorsReducer