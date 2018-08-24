import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
       })
    }
  }

  render() {
    const { list } = this.props;

    const itemCards = list.items.map(item => (
      <ListItem
        key={item._id}
        listId={list._id}
        item={item}
       />
    ))

    return itemCards
  }
}

ItemList.propTypes = {
  list: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps)(withRouter(ItemList));
