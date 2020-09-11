import {RECEIVE_LIGHTSABERS, UPDATE_WITH_UPDATED_LIGHTSABER, UPDATE_LIGHTSABER_ERRORS, } from '../actions/inventory_actions';
import merge from 'lodash/merge';

const inventoryReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LIGHTSABERS:
            const newState = {};
            action.lightsabers.forEach((lightsaber) => {
                newState[lightsaber.id] = lightsaber;
            });
            return newState;
        case UPDATE_WITH_UPDATED_LIGHTSABER:
            // const stateArray = Object.keys(state).map((key) => state[key]);
            // for (let i = 0; i < stateArray.length; i++) {
            //     var currentSaber = stateArray[i];
            //     if (currentSaber.id === action.lightsaber.id) {
            //         stateArray[i] = action.lightsaber;
            //     }
            // }
            // return stateArray

            const updatedLightsaber = {[action.lightsaber.id]: action.lightsaber};
            return merge({}, state, updatedLightsaber);
        default:
            return state;
    }
};

export default inventoryReducer