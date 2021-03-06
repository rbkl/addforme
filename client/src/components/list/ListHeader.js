import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { editListHeaders } from '../../actions/listActions';


class ListHeader extends Component {
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

    this.props.editListHeaders(this.props.listId, listData);

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
      title: this.props.title,
      link: this.props.link,
      instructions: this.props.instructions,
    })
  }

  render() {
    const { editable, deleted } = this.state;

    let listHeader;

    if (!editable && !deleted) {

      listHeader = (
        <div className='card card-list-header bg-light mb-3'>
          <h5 className="card-header mb-2 card-header-title">{this.state.title}</h5>
          <div className='card-body card-body-list-info'>
            <div className="row mb-2">
              <div className="col">
                <a href={this.state.link} target="_blank">{this.state.link}</a>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted card-header-instructions">{this.state.instructions}</h6>
              </div>
              <div className="col text-right align-bottom">
                <button className="btn btn-light btn-header btn-sm" onClick={this.handleClick}><i className="fa fa-edit pr" /></button>
              </div>
            </div>
          </div>
        </div>
      )

    } else if (editable && !deleted) {

      listHeader = (
        <div className='card bg-light mb-3 card-list-header'>
          <div className='card-header mb-2 card-header-title-editting'>
            <TextFieldGroup
              placeholder="* Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <div className='card-body card-body-list-info'>
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
                <button className="btn btn-light btn-sm btn-header" onClick={this.onClickSave}><i className="fa fa-save pr editable" /></button>
              </div>
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
        listHeader
    )
  }
}

ListHeader.propTypes = {
  editable: PropTypes.bool,
  deleted: PropTypes.bool,
  editListHeaders: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { editListHeaders })(withRouter(ListHeader));
