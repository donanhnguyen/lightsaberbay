import {RECEIVE_BUDGETS, RECEIVE_BUDGET, RESET_BUDGETS, UPDATE_WITH_DELETED_BUDGET} from '../actions/budget_actions';
import merge from 'lodash/merge';

const budgetsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_BUDGETS:
            const newState = {};
            action.budgets.forEach((budget) => {
                newState[budget.id] = budget;
            });
            return newState;
        case RECEIVE_BUDGET:
            const newBudget = {[action.budget.id]: action.budget};
            return merge({}, state, newBudget);
        case RESET_BUDGETS:
            return {};
        case UPDATE_WITH_DELETED_BUDGET:
            const stateArray = Object.keys(state).map((key) => state[key]);
            const newStateWithoutDeletedBudget = stateArray.filter((budget) => {
                return budget.id !== action.budget.id
                }    
            )
            const newStateGoddammit = {};
            newStateWithoutDeletedBudget.forEach((single_budget) => {
                newStateGoddammit[single_budget.id] = single_budget;
            });
            return newStateGoddammit;
        default:
            return state;
    }
};

export default budgetsReducer