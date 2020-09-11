import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import inventoryReducer from './my_inventory_reducer'

const entitiesReducer = combineReducers({
    user: usersReducer,
    inventory: inventoryReducer
})

export default entitiesReducer;