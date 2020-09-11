import {connect} from 'react-redux';
import myInventory from './my_inventory';
import {fetchAllTheUsersLightsabers, updateLightsaberListing} from '../actions/inventory_actions';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
    currentUserLightsabers: Object.keys(state.entities.inventory).map((key) => state.entities.inventory[key]),
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllTheUsersLightsabers: (user_id) => dispatch(fetchAllTheUsersLightsabers(user_id)),
    updateLightsaberListing: (lightsaber, user_id, lightsaber_id) => dispatch(updateLightsaberListing(lightsaber, user_id, lightsaber_id)),
})

const MyInventoryContainer = connect(mapStateToProps, mapDispatchToProps)(myInventory);

export default MyInventoryContainer;