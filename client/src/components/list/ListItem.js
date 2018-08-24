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
        <div>
          <div className='row'>
            <div className='col-10'>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Order"
                name="order"
                value={this.state.order}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Notes"
                name="notes"
                value={this.state.notes}
                onChange={this.onChange}
              />
            </div>
            <div className='col-2 text-right'>
              <button className="btn btn-light btn-sm" onClick={this.onClickSave}><i className="fa fa-save pr editable"/></button>
              <button className="btn btn-light btn-sm" onClick={this.onClickDelete}><i className="fa fa-trash pr-1 editable"/></button>
            </div>
          </div>
        </div>
      )

    } else if (!editable && !deleted) {

      listItemContent = (
        <div>
          <div className='row'>
            <div className='col-10'>
              <h6 className='font-weight-bold'>{this.state.name}</h6>
              <p>
                {this.state.order} <br/>
                {this.state.notes}
              </p>

            </div>
            <div className='col-2 text-right'>
              <button className="btn btn-light btn-sm" onClick={this.handleClick}><i className="fa fa-edit pr" /></button>
              <button className="btn btn-light btn-sm disabled"><i className="fa fa-trash pr-1 list-icon-hidden"/></button>
            </div>
          </div>
        </div>
      )
    } else if (deleted) {

      listItemContent = '';

    };


    return (
      <div className='card card-list-item card-body bg-light mb-3'>
        {listItemContent}
      </div>
    )
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
