import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
import ListItemGroup from '../common/ListItemGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import ListItem from './ListItem';
import { editListHeaders } from '../../actions/listActions';


class EditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      deleted: false,
      errors: {},
    }

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    // this.onClickDelete = this.onClickDelete.bind(this);

  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  handleClick() {this.setState(prevState => ({
      editable: !prevState.editable
    })
  )}

  onClickSave() {

    const listData = {
      title: this.state.title,
      link: this.state.link,
      instructions: this.state.instructions,
    }

    this.props.editListHeaders(this.props.list._id, listData);

    this.setState(prevState => ({
      editable: !prevState.editable,
    }))

    this.setState({
      title: this.state.title,
      link: this.state.link,
      instructions: this.state.instructions,
      })

    }


  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
       })
    }
  }

  componentDidMount() {

    this.setState({
      title: this.props.list.title,
      link: this.props.list.link,
      instructions: this.props.list.instructions,
    })
  }

  render() {
    const { list } = this.props;
    const { editable, deleted } = this.state;

    const itemRows = list.items.map(item => (
      <ListItem
        key={item._id}
        listId={list._id}
        item={item}
       />
    ))

    let listHeader;

    if (!editable && !deleted) {

      listHeader = (
        <div className='list-header'>
          <div className="row">
            <div className="col">
              <h4>{this.state.title}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <a href={this.state.link} target="_blank">{this.state.link}</a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <small className="font-weight-bold text-muted">{this.state.instructions}</small>
            </div>
            <div className="col text-right align-bottom">
              <button className="btn btn-light btn-sm" onClick={this.handleClick}><i className="fa fa-edit pr" /></button>
            </div>
          </div>
        </div>
      )

    } else if (editable && !deleted) {

      listHeader = (
        <div className='list-header'>
          <div className="row">
            <div className="col">
              <TextFieldGroup
                placeholder="* Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextFieldGroup
                placeholder="Link"
                name="link"
                value={this.state.link}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextFieldGroup
                placeholder="Instructions"
                name="instructions"
                value={this.state.instructions}
                onChange={this.onChange}
              />
            </div>
            <div className="col text-right align-bottom">
              <button className="btn btn-light btn-sm" onClick={this.onClickSave}><i className="fa fa-save pr editable" /></button>
            </div>
          </div>
        </div>
      )

    } else if (deleted) {
      listHeader = (
        <div className='list-header'>
        </div>
      )
    }




    return (
      <div className='card card-body bg-light mb-3'>
        {listHeader}
        <div className="row">
          <div className="col text-left mt-5">
            <table className="table table-hover thead-dark">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Order</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {itemRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

EditList.propTypes = {
  list: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  deleted: PropTypes.bool,
  editListHeaders: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { editListHeaders })(withRouter(EditList));
