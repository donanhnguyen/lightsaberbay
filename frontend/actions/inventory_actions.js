import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
export const RECEIVE_LIGHTSABERS = 'RECEIVE_LIGHTSABERS';
export const UPDATE_WITH_UPDATED_LIGHTSABER = "UPDATE_WITH_UPDATED_LIGHTSABER"
export const UPDATE_LIGHTSABER_ERRORS = "UPDATE_LIGHTSABER_ERRORS"

export const receiveLightsabers = (lightsabers) => ({
    type: RECEIVE_LIGHTSABERS,
    lightsabers: lightsabers
});

export const updateWithUpdatedLightsaber = (updated_lightsaber) => ({
    type: UPDATE_WITH_UPDATED_LIGHTSABER,
    lightsaber: updated_lightsaber
})

export const updateLightsaberErrrors = (errors) => ({
    type: UPDATE_LIGHTSABER_ERRORS,
    errors: errors
})

export const fetchAllTheUsersLightsabers = (user_id) => {
    return function (dispatch) {
        LightsaberAPIUtil.fetchUserLightsabers(user_id).then((all_lightsabers) =>  {
            dispatch(receiveLightsabers(all_lightsabers))
        })
    }
    
};

export const updateLightsaberListing = (lightsaber, user_id, lightsaber_id) => {
    return function (dispatch) {
        LightsaberAPIUtil.updateUsersLightsaber(lightsaber, user_id, lightsaber_id).then( (single_lightsaber) => (
            dispatch(updateWithUpdatedLightsaber(single_lightsaber))
         ), err => (
            dispatch(updateLightsaberErrrors(err.responseJSON))
        ))
    }
};
