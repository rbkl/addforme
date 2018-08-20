import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

// Import Actions
import { deleteListItem, editListItem } from '../../actions/listActions';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      editable: false,
      deleted: false,
      errors: {},
      name: '',
      order: '',
      notes: '',
    }

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickSave = this.onClickSave.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount() {

    this.setState({
      name: this.props.item.name,
      order: this.props.item.order,
      notes: this.props.item.notes,
    })

  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  handleClick() {this.setState(prevState => ({
      editable: !prevState.editable
    })
  )}

  onClickSave() {

    const itemData = {
      name: this.state.name,
      order: this.state.order,
      notes: this.state.notes,
    }

    const { item, listId } = this.props;

    this.props.editListItem(listId, item.id, itemData);

    this.setState(prevState => ({
      editable: !prevState.editable,
    }))

    this.setState(itemData)
  }


  onClickDelete() {
    this.props.deleteListItem(this.props.listId, this.props.item._id);
    this.setState(prevState => ({
        deleted: !prevState.deleted
      }))
  }


  render() {
    const { item, listId } = this.props;
    const { editable, deleted } = this.state;

    let listItemContent;

    if (editable && !deleted) {

      listItemContent = (
        <tr key={item._id}>
          <th scope="row">
            <button className="btn btn-light btn-sm" onClick={this.onClickDelete}><i className="fa fa-trash pr-1 editable"/></button>
            <button className="btn btn-light btn-sm" onClick={this.onClickSave}><i className="fa fa-edit pr editable"/></button>
          </th>
          <td>
            <TextFieldGroup
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </td>
          <td>
            <TextFieldGroup
              placeholder="Order"
              name="order"
              value={this.state.order}
              onChange={this.onChange}
            />
          </td>
          <td>
            <TextFieldGroup
              placeholder="Notes"
              name="notes"
              value={this.state.notes}
              onChange={this.onChange}
            />
          </td>
        </tr>
      )

    } else if (!editable && !deleted) {

      listItemContent = (
        <tr key={item._id}>
          <th scope="row" className="no-wrap">
            <button className="btn btn-light btn-sm disabled"><i className="fa fa-trash pr-1 list-icon-hidden"/></button>
            <button className="btn btn-light btn-sm" onClick={this.handleClick}><i className="fa fa-edit pr" /></button>
          </th>
          <td>{this.state.name}</td>
          <td>{this.state.order}</td>
          <td>{this.state.notes}</td>
        </tr>
      )
    } else if (deleted) {

      listItemContent = '';

    };


    return listItemContent
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  deleteListItem: PropTypes.func.isRequired,
  editListItem: PropTypes.func.isRequired,
  error: PropTypes.string,
}

ListItem.defaultProps = {
  editable: false,
  deleted: false,
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { deleteListItem, editListItem })(ListItem);
