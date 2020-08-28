import {connect} from 'react-redux';
import NewBudgetForm from './new_budget_form';
import {fetchBudgets, createBudget, resetBudgetErrors} from '../actions/budget_actions';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
    budgetErrors: Object.keys(state.entities.budgetsErrors).map((key) => {
        return `${key} ${state.entities.budgetsErrors[key][0]}`;
    })
})
    
const mapDispatchToProps = (dispatch) => ({
    fetchBudgets: (budgets) => dispatch(fetchBudgets(budgets)),
    createBudget: (user_id, budget) => dispatch(createBudget(user_id, budget)),
    resetBudgetErrors: () => dispatch(resetBudgetErrors())
})

const NewBudgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewBudgetForm);

export default NewBudgetFormContainer;