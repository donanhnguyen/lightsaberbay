import React, {useContext} from 'react';
import {Route} from 'react-router-dom';
import NavContainer from './nav_container';
import Footer from './footer';
import GreetingContainer from './greeting_container';
import {AuthRoute, ProtectedRoute} from '../util/route_util.jsx';
import SessionFormContainer from './session_form_container';
import Marketplace from './marketplace';
import Inventory from './inventory';
import Messages from './messages';
import Cart from './cart';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <NavContainer />
                <Route exact path="/" component={GreetingContainer} />
                <Route path="/marketplace" component={Marketplace} />
                <Route path="/Inventory" component={Inventory} />
                <Route path="/messages" component={Messages} />
                <Route path='/cart' component={Cart} />
                <AuthRoute path="/login" component={SessionFormContainer} />
                <AuthRoute path="/signup" component={SessionFormContainer} />
                <div class='clearfix'></div>
                <Footer />
            </div>
        )
    }
}

export default App;