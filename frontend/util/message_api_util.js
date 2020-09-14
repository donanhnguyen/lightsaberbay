export const fetchMessages = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/messages`
    })
};

export const updateMessageRead = (message, user_id, message_id) => (
    $.ajax({
        method: 'PUT',
        url: `api/users/${user_id}/messages/${message_id}`,
        data: {message}
    })
);

export const createMessage = (message, user_id) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${user_id}/messages`,
        data: {message}
    })
);