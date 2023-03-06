import React, {useState} from 'react';
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

function App () {

    var [cartInfoState, setCartInfoState] = useState(0);

    return (
        <div>
                    <NavContainer cartInfoState={cartInfoState}/>
            <div id="all-other-content">
                    <Route exact path="/" component={GreetingContainer} />
                    
                    <Route path='/marketplace'><Marketplace setCartInfoState={setCartInfoState}/></Route>

                    <Route path="/Inventory" component={Inventory} />

                    <Route path="/messages" component={Messages} />

                    <Route path='/cart'><Cart setCartInfoState={setCartInfoState}/></Route>

                    <AuthRoute path="/login" component={SessionFormContainer} />

                    <AuthRoute path="/signup" component={SessionFormContainer} />

                    <div class='clearfix'></div>
                    <Footer /> 
            </div>
        </div>
    )
}

export default App;