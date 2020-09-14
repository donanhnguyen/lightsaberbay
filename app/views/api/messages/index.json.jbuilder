json.array! @user_messages do |message|
    json.id message.id
    json.body message.body
    json.sender message.sender
    json.user_id message.user_id
    json.read message.read
    json.created_at message.created_at
    json.updated_at message.updated_at
end