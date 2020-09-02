import * as LightsaberApi from "../util/lightsaber_api_util";

export const fetchAllLightsabers = () => {
    return function (dispatch) {
        LightsaberApi.fetchAllLightsabers().then((all_lightsabers) =>  dispatch(receiveLightsabers(all_lightsabers)))
    }
};