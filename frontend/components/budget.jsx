import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

class Budget extends React.Component {

    constructor(props) {
        super(props)
    }

    deleteBudget () {
        var {budget, currentUser, deleteBudget} = this.props;
        deleteBudget(currentUser.id, budget.id);
    }

    render () {
        var {budget} = this.props;
        return (
            <div class='single-budget'>
                <Link to={`/budgets/${budget.id}`}>
                    <h1>{budget.month} {budget.year}</h1>
                    <h1>Annual Salary: {budget.salary}</h1>
                </Link>
                <button class='post-submit-button' onClick={this.deleteBudget.bind(this)}>Delete Budget</button>
            </div>
        )
    }

}

export default Budget;