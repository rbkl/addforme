import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListItem extends Component {
  render() {
    const { list } = this.props;


    return (
      <div className='card card-body bg-light mb-3'>
        <div className="row">
          <div className="col">
            <h4>{list.title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <small>{list.link}</small>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <small className="font-weight-bold text-muted">{list.instructions}</small>
          </div>
        </div>
        <div className="row">
          <div className="col text-right">
            <Link to={`lists/${list._id}`} className='btn btn-info'>
              Edit List
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
}

export default ListItem;
