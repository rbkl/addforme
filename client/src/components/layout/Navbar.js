import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link className="nav-link" to="/register">Sign In</Link>
        </li> */}
      </ul>
    );


    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand nav-bar-logo abs-center-x" to="/">AddFor .Me</Link>
          <ul className="navbar-nav ml-auto">
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,

})

export default connect(mapStateToProps, { logoutUser })(Navbar);
