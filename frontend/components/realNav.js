import React, { useEffect } from 'react';
import {
    useHistory,
    Link,
  } from 'react-router-dom';

function RealNav (props) {

    const history = useHistory();

    function logout() {
        navigate();
        localStorage.clear();
        props.logout();
    }

    function navigate () {
        history.push("/logbackin");
    }

    if (props.currentUser) {
        return (
                <div class="nav-bar-container">

                        <ul class="nav-bar-list">
                            <li><Link class={'tc-link nav-link nav-link-hover'} to="/">Home</Link></li>
                            <li> <Link class={'nav-link nav-link-hover'} to="/marketplace">Marketplace</Link></li>   
                            <li> <Link class={'nav-link nav-link-hover'} to="/inventory">Inventory</Link></li>          
                            <li> <Link class={'nav-link nav-link-hover'} to="/messages">Messages</Link></li>
                            <li> <Link class={'nav-link nav-link-hover'} to="/cart">Cart</Link></li>         
                            <li>
                                <button class={'logout-button'} onClick={logout}>Log Out</button>
                            </li>
                        </ul>

                    <div class="clearfix"></div>
                </div>
        )
    } else {
        return (
                <div class="nav-bar-container">
            
                        <ul class="nav-bar-list">
                            <li> <Link class={'tc-link nav-link nav-link-hover'} to="/">Home</Link> </li>
                            <li> <Link class={'nav-link nav-link-hover'} to="/login">Marketplace</Link></li>   
                            <li>
                                <Link class={'nav-link nav-link-hover'} to="/login">Log In</Link>
                            </li>
                            <li>
                                <Link class={'nav-link nav-link-hover'} to="/signup">Sign Up</Link>
                            </li>
                        </ul>
            
                    <div class="clearfix"></div>
                </div>
        )
    }
    //end of render method

    
}

export default RealNav;