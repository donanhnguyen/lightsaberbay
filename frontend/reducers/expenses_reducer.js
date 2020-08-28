import {RECEIVE_EXPENSES, RECEIVE_EXPENSE, RESET_EXPENSES, UPDATE_WITH_DELETED_EXPENSE} from '../actions/expense_actions';
import merge from 'lodash/merge';

const expensesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_EXPENSES:
            const newState = {};
            action.expenses.forEach((expense) => {
                newState[expense.id] = expense;
            });
            return newState;
        case RECEIVE_EXPENSE:
            const newExpense = {[action.expense.id]: action.expense};
            return merge({}, state, newExpense);
        case UPDATE_WITH_DELETED_EXPENSE:
            const stateArray = Object.keys(state).map((key) => state[key]);
            const newStateWithoutDeletedExpense = stateArray.filter((expense) => {
                return expense.id !== action.expense.id
                }    
            )
            const newStateGoddammit = {};
            newStateWithoutDeletedExpense.forEach((single_expense) => {
                newStateGoddammit[single_expense.id] = single_expense;
            });
            return newStateGoddammit;
        case RESET_EXPENSES:
            return {};
        default:
            return state;
    }
};

export default expensesReducer