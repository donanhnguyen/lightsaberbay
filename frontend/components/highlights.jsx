import React, {useReducer, useState, useEffect} from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllLightsabers": 
            return action.payload;
        default:
            return state;
    }
}

function fetchAllTheLightsabers (dispatch) {
    LightsaberAPIUtil.fetchAllLightsabers().then((all_lightsabers) =>  {
        dispatch({type: "fetchAllLightsabers", payload: all_lightsabers})
    })
};

export default function Highlights() {

    var [allLightsabersState, lightsaberDispatch] = useReducer(lightsaberReducer);

    useEffect(() => {
        fetchAllTheLightsabers(lightsaberDispatch);
    }, []);

    function displayTop3 () {
        if (allLightsabersState) {
           var endArray = allLightsabersState.sort((a, b) => {
                var keyA = new Date(a.updated_at),
                    keyB = new Date(b.updated_at);
                    return keyB - keyA;
            });
            var finalArray = endArray.slice(0, 3);

            const displayArray = finalArray.map((lightsaber) => {
                var lightsaberDate = lightsaber.updated_at.split("")
                var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");

                return (<div class={`lightsaber-highlight-item ${lightsaber.color + lightsaber.style}`}>
                    <h1>{lightsaber.name}</h1>
                    <h1>Seller: {lightsaber.owner}</h1>
                    <h1 style={{color: 'rgb(89, 213, 250)'}}>{lightsaber.price} Credits</h1>
                    <h1 class='lightsaber-listed-date'>Listed on {displayLightsaberDate}</h1>
                </div>)
            })

            return displayArray;
        }
    }

    return (
        <div>
            <h1 id='highlightsh1'>Most Recently Listed Items:</h1>
            <div id="highlights">
                {displayTop3()}
            </div>
        </div>
        
    )
}
