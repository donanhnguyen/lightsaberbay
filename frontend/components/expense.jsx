import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

class Expense extends React.Component {

    constructor(props) {
        super(props)
    }

    deleteExpense () {
        var {expense, currentUserId, currentBudget, deleteExpense} = this.props;
        deleteExpense(currentUserId, currentBudget.id, expense.id);
    }

    render () {
        var {expense} = this.props;
        return (
            <div>
                <h1>{expense.date} : {expense.category}</h1>
                <p>Amount: ${expense.amount}</p>
                <p>Description:</p>
                <p>{expense.description}</p>
                <button 
                    class='post-submit-button'
                    onClick={this.deleteExpense.bind(this)}
                >Delete Expense
                </button>
            </div>
        )
    }

}

export default Expense;