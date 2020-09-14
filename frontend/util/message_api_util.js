export const fetchMessages = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/messages`
    })
};

export const createMessage = (message, user_id) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${user_id}/messages`,
        data: {message}
    })
);