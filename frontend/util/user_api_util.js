export const fetchUser = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}`
    })
};

export const updateUsersCredits = (user, user_id) => {
    return $.ajax({
        method: 'PUT',
        url: `api/users/${user_id}`,
        data: {user}
    })
};
