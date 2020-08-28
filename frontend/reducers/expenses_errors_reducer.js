import {RECEIVE_EXPENSE_ERRORS, RESET_EXPENSE_ERRORS} from '../actions/expense_actions';
import merge from 'lodash/merge';

const expensesErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_EXPENSE_ERRORS:
            return action.errors;
        case RESET_EXPENSE_ERRORS:
            return {};
        default:
            return state;
    }
};

export default expensesErrorsReducer