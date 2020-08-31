json.array! @user_messages do |message|
    json.id message.id
    json.body message.body
    json.sender message.sender
    json.user_id message.user_id
    json.created_at lightsaber.created_at
    json.updated_at lightsaber.updated_at
end