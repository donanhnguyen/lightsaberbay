import {connect} from 'react-redux';
import Greeting from './greeting';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    
});

const GreetingContainer = connect(mapStateToProps, mapDispatchToProps)(Greeting);

export default GreetingContainer;