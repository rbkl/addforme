import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createList } from '../../actions/listActions';

class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      link: '',
      instructions: '',
      items: [],
      errors: {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const listData = {
      title: this.state.title,
      link: this.state.link,
      instructions: this.state.instructions,
    }

    this.props.createList(listData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    const errors = this.state.errors;


    return (
      <div className="create-list">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title (ex. Chipotle lunch order)"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Link (Optional link to a menu, etc.)"
                  name="link"
                  value={this.state.link}
                  onChange={this.onChange}
                  error={errors.link}
                />
                <TextFieldGroup
                  placeholder="Instructions (ex. Complete by noon!)"
                  name="instructions"
                  value={this.state.instructions}
                  onChange={this.onChange}
                  error={errors.instructions}
                />
                <input type="submit" value="Create and Share" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateList.propTypes = {
  list: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createList: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  list: state.list,
  errors: state.errors
})

export default connect(mapStateToProps, { createList })(withRouter(CreateList));
