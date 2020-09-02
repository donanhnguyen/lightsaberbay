export const fetchAllLightsabers = () => {
    return $.ajax({
        method: 'GET',
        url: `api/lightsabers`
    })
};

export const fetchUserLightsabers = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/lightsabers`
    })
};

export const updateLightsaber = (lightsaber, user_id, lightsaber_id) => (
    $.ajax({
        method: 'PUT',
        url: `api/users/${user_id}/lightsabers/${lightsaber_id}`,
        data: {lightsaber}
    })
)