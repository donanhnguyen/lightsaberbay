json.array! @all_lightsabers do |lightsaber|
    json.id lightsaber.id
    json.name lightsaber.name
    json.type lightsaber.type
    json.forsale lightsaber.forsale
    json.price lightsaber.price
    json.lat lightsaber.lat
    json.lng lightsaber.lng
    json.user_id lightsaber.user_id
    json.created_at lightsaber.created_at
    json.updated_at lightsaber.updated_at
end