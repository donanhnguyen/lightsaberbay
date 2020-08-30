import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
  } from 'react-router-dom';

class Greeting extends React.Component {

    constructor(props) {
        super(props);
    }

    currentUserHeading () {
        if (this.props.currentUser) {
            return (
            <div>
                <h1 class="greeting-logged-in left">You are logged in as: {this.props.currentUser.username}</h1>
                <h1 class="greeting-logged-in right">Credits: {this.props.currentUser.credits}</h1>
                <div class="clearfix"></div>
            </div>
                
            )
        } else {
            return <h1 class="greeting-logged-in">You are not currently logged in. Click <Link to="/login">Here</Link> to login or <Link to="/signup">Here</Link> to sign up.</h1>
        }
    }

    render () {
        return (
            <div>
                {this.currentUserHeading()}
                <div class="greeting-container">
                    <h1>Lightsaber Bay</h1>
                    <p>Marketplace for a Jedi's Weapon</p>
                </div>
            </div>
        )
    }
}

export default Greeting;