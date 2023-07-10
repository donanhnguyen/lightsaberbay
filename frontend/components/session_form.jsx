import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter} from 'react-router-dom'

class SessionForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            credits: 1000,
            cart: [],
            confirmPassword: '',
          };
    }


    handleSubmit (event) {
        event.preventDefault();
        const user = Object.assign({}, this.state);
        if (user.confirmPassword) {
            delete user.confirmPassword;
        }
        if (this.props.formType === "signup") {
            if (this.state.password === this.state.confirmPassword) {
               this.props.processForm(user); 
            } else {
                alert('Passwords do not match!');
            }
        } else {
            this.props.processForm(user); 

        }
    }

    navLink () {
        if (this.props.formType === 'login') {
            return <Link class={'nav-link session-link-hover'} to="/signup">sign up instead</Link>;
          } else {
            return <Link class={'nav-link session-link-hover'} to="/login">log in instead</Link>;
          }
    }

    update (field) {
       return (event) => {
           this.setState({
                [field]: event.currentTarget.value
            })
       } 
    }

    renderErrors() {
        if (this.props.errors.length > 0) {
            return (
                <ul>
                    {this.props.errors.map((error, i) => (
                    <li class='error-message' key={`error-${i}`}>
                        {error}
                    </li>
                    ))} 
                    <br />
                </ul>
               
            );
        }   
    }
    componentWillUnmount () {
        this.props.clearErrorsFunction();
    }

    confirmCurrentPassword () {
        if (this.props.formType === "signup") {
            return <div>
                    <label>Confirm Password</label>
                    <input ref='confirmCurrentPassword' type='password' value={this.state.confirmPassword} onChange={this.update('confirmPassword')}/><br/><br/>
                </div>
        }
    }

    render () {
        return (
            <div class="session-form-container session-form-background">

                <div class="session-form">
                    <h1> {this.props.formType} or {this.navLink()}</h1>
                    {this.renderErrors()}
                    <form onSubmit={ this.handleSubmit.bind(this) }>
                        <label>Username</label>
                        <input type='text' value={this.state.username} onChange={this.update('username')} />
                            <br /><br />
                        <label>Password</label>
                        <input type='password' value={this.state.password} onChange={this.update('password')}/>
                            <br /><br />

                        {this.confirmCurrentPassword()}

                        <input class='session-submit-button' type="submit" value="Submit" />
                    </form>
                </div>

            </div> 
        )
        
    }

}

export default withRouter(SessionForm);