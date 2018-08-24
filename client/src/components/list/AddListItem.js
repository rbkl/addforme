import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addListItem, getListById } from '../../actions/listActions';



class AddListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      order: '',
      notes: '',
      timestamp: 'no timestamp yet',
      errors: {},
      disabled: false,
      opened: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }


  // componentDidMount() {
  //   const { listId } = this.props;
  //   console.log(listId);
  //
  //   this.props.getListById(listId);
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const itemData = {
      name: this.state.name,
      order: this.state.order,
      notes: this.state.notes,
    }

    const { listId } = this.props;

    this.props.addListItem(listId, itemData);

    this.setState({
      name: '',
      order: '',
      notes: '',
    });
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onCheck(e) {
    this.setState({
      opened: !this.state.opened,
    })
  }




  render() {
    const errors = this.state.errors;
    const { opened } = this.state;

    let itemFields;

    if (opened) {
      itemFields = (
        <form id="add-item-form" onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="* Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Order"
            name="order"
            value={this.state.order}
            onChange={this.onChange}
            error={errors.order}
          />
          <TextFieldGroup
            placeholder="Notes"
            name="notes"
            value={this.state.notes}
            onChange={this.onChange}
            error={errors.notes}
          />
            <input
              type="submit"
              value="Add"
              className="btn btn-orange btn-block mt-4"
            />
          </form>
      )
    } else {
      itemFields = (<div></div>);
    }

    return (
      <div className="row">
        <div className="col-md-12 m-auto mt-3 mb-3 text-right">
          <button className="btn btn-light btn-sm mb-3" onClick={this.onCheck}><i className={classnames("fa fa-plus pr",{'editable': !opened})}/></button>
            {itemFields}
        </div>
      </div>
    )
  }
}

AddListItem.propTypes = {
  itemData: PropTypes.object,
  listId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  addListItem: PropTypes.func.isRequired,
  getListById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  list: state.list,
  errors: state.errors,
})

export default connect(mapStateToProps, { addListItem, getListById })(withRouter(AddListItem));
