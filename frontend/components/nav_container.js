import {connect} from 'react-redux';
import {logout} from '../actions/session_actions';
import RealNav from './realNav';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout()) 
    }
});

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(RealNav);

export default NavContainer;