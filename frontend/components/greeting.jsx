import React from 'react';
import {Link,} from 'react-router-dom';
import Notifications from './notifications';
import StarWarsText from './starwarstext';

class Greeting extends React.Component {

    constructor(props) {
        super(props);
    }

    currentUserHeading () {
        if (this.props.currentUser) {
            return (
            <div>
                <h1 class="greeting-logged-in left">Logged in as: {this.props.currentUser.username}</h1>
                <div class="clearfix"></div>
            </div>
                
            )
        } else {
            return <h1 class="greeting-logged-in">You are not logged in. Click <Link to="/login">Here</Link> to login or <Link to="/signup">Here</Link> to sign up.</h1>
        }
    }

    displayNotifications () {
        if (this.props.currentUser) {return <Notifications currentUser={this.props.currentUser}/>};
    }

    render () {
        if (this.props.currentUser) {
           localStorage.setItem("currentLoggedInUser", JSON.stringify(this.props.currentUser));
        }
        return (
            <div>
                {this.currentUserHeading()}
                <div>
                    {this.displayNotifications()}
                </div>
                <div class="greeting-container">
                    <h1>Lightsaber Bay</h1>
                    <p>Marketplace for a Jedi's Weapon</p>
                </div>
                <div>
                    <StarWarsText />
                </div>
            </div>
        )
    }
}

export default Greeting;