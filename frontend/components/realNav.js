import React, { useEffect, useState } from 'react';
import {
    useHistory,
    Link,
  } from 'react-router-dom';

function RealNav (props) {

    const [pathState, setPathState] = useState("/");
    const history = useHistory();

    function changePathState () {
        setPathState(history.location.pathname);
    }

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
                            <li onClick={changePathState}><Link class={`tc-link nav-link nav-link-hover ${pathState === "/" ? 'nav-link-chosen' : ''}     `} to="/">Home</Link></li>
                            <li onClick={changePathState}> <Link class={`nav-link nav-link-hover ${pathState === "/marketplace" ? 'nav-link-chosen' : ''}`} to="/marketplace">Marketplace</Link></li>   
                            <li onClick={changePathState}> <Link class={`nav-link nav-link-hover ${pathState === "/inventory" ? 'nav-link-chosen' : ''}`} to="/inventory">Inventory</Link></li>          
                            <li onClick={changePathState}> <Link class={`nav-link nav-link-hover ${pathState === "/messages" ? 'nav-link-chosen' : ''}`} to="/messages">Messages</Link></li>
                            <li onClick={changePathState}> <Link class={`nav-link nav-link-hover ${pathState === "/cart" ? 'nav-link-chosen' : ''}`} to="/cart"><i class="fa fa-shopping-cart" style={{fontSize:'32px', color: "red"}}></i> Cart <p class='cart-item-number'>{props.cartInfoState}</p></Link></li>         
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
                            <li onClick={changePathState}> <Link class={`tc-link nav-link nav-link-hover  ${pathState === "/" ? 'nav-link-chosen' : ''}     `} to="/">Home</Link> </li>
                            <li onClick={changePathState}> <Link class={`nav-link nav-link-hover ${pathState === "/marketplace" ? 'nav-link-chosen' : ''}`} to="/login">Marketplace</Link></li>   
                            <li onClick={changePathState}>
                                <Link class={`nav-link nav-link-hover ${pathState === "/login" ? 'nav-link-chosen' : ''}`} to="/login">Log In</Link>
                            </li>
                            <li onClick={changePathState}>
                                <Link class={`nav-link nav-link-hover ${pathState === "/signup" ? 'nav-link-chosen' : ''}`} to="/signup">Sign Up</Link>
                            </li>
                        </ul>
            
                    <div class="clearfix"></div>
                </div>
        )
    }
    //end of render method

    
}

export default RealNav;