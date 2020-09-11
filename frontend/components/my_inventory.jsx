import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
  } from 'react-router-dom';
import UserLightsaberClass from './user_lightsaber_class';

  class MyInventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ready: false};
    }

    componentDidMount () {
        this.props.fetchAllTheUsersLightsabers(this.props.currentUser.id);
    }

    componentWillUpdate () {
    }

    displayLightsabersForSale () {
        var currentLightsabers = this.props.currentUserLightsabers;
            var arrayOfSabers = [];
            for (let i = 0; i < currentLightsabers.length; i++) {
                if (currentLightsabers[i].forsale) {
                    arrayOfSabers.push(currentLightsabers[i]);
                }
            }
            var displayArrayOfSabers = arrayOfSabers.map((lightsaber) => {
                return <div><UserLightsaberClass updateLightsaberListing={this.props.updateLightsaberListing} lightsaber={lightsaber}/></div>
            })
            return displayArrayOfSabers;
       
    }
   
    displayLightsabersNotForSale () {
        var currentLightsabers = this.props.currentUserLightsabers;
            var arrayOfSabers = [];
            for (let i = 0; i < currentLightsabers.length; i++) {
                if (!currentLightsabers[i].forsale) {
                    arrayOfSabers.push(currentLightsabers[i]);
                }
            }
            var displayArrayOfSabers = arrayOfSabers.map((lightsaber) => {
                return <div><UserLightsaberClass updateLightsaberListing={this.props.updateLightsaberListing} lightsaber={lightsaber}/></div>
            })
            return displayArrayOfSabers;
        
    }

    render () {
       return (
           <div>
                <h1> MY INVENTORY USING CLASS COMPONENT </h1>
                <h1>Inventory for Sale:</h1>
                <div class="all-lightsabers-container">
                    {this.displayLightsabersForSale()}
                </div>
                
                <div class="clearfix"></div>

                <h1>Inventory Not for Sale:</h1>
                <div class="all-lightsabers-container">
                    {this.displayLightsabersNotForSale()}
                </div>

                <div class="clearfix"></div>
           </div>
       )
    }

}

export default MyInventory;