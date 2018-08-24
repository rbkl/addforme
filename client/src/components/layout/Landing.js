import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import CreateList from '../create-list/CreateList';

class Landing extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }


  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h4 className="display-3 mb-4 tag-line">Please, add for me!
                </h4>
                <p className="lead">Quickly create a shareable list, and add.</p>
                <hr />
                <CreateList />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(Landing);
