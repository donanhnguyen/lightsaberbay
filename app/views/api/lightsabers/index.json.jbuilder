json.array! @all_lightsabers do |lightsaber|
    json.id lightsaber.id
    json.name lightsaber.name
    json.color lightsaber.color
    json.style lightsaber.style
    json.forsale lightsaber.forsale
    json.price lightsaber.price
    json.user_id lightsaber.user_id
    json.owner lightsaber.user.username
    json.created_at lightsaber.created_at
    json.updated_at lightsaber.updated_at
end
