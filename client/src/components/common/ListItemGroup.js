import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemGroup = ({ item, editable }) => {


  let listItemContent;

  if (editable) {

    listItemContent = (
      <tr key={item._id}>
        <th scope="row"><i className={classnames("fa fa-edit pr-1",{'editable': !editable})}/></th>
        <td><button className="btn btn-dark" onClick={this.onClick}>Click</button></td>
        <td>{item.order}</td>
        <td>{item.notes}</td>
      </tr>
    )

  } else {

    listItemContent = (
      <tr key={item._id}>
        <th scope="row"><i className={classnames("fa fa-edit pr-1",{'editable': !editable})}/></th>
        <td>Yay!!</td>
        <td>{item.order}</td>
        <td>{item.notes}</td>
      </tr>
    )

  };



    return listItemContent
}

ListItemGroup.propTypes = {
  item: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

ListItemGroup.defaultProps = {
  editable: false,
}

export default ListItemGroup;
