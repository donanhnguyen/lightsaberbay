import {connect} from 'react-redux';
import {logout} from '../actions/session_actions';
import Nav from './nav';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default NavContainer;