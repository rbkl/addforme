import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Pusher from 'pusher-js';


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      items: [],
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

  componentDidMount() {
    this.setState({
      items: this.props.items,
    })

    const pusher = new Pusher('42885eae3e686bd9dac2', {
          cluster: 'us2',
          encrypted: true
        });
        const channel = pusher.subscribe(this.props.match.params.list_id);
        channel.bind('added-item', data => {
          this.setState({ items: [...this.state.items, data] });
        });

        channel.bind('deleted-item', removeIndex => {
          const newItems = this.state.items;
          newItems.splice(removeIndex, 1);
          this.setState({ items: newItems });
        });

        channel.bind('editted-item', data => {
          const newItems = data;
          this.setState(prevState => ({
              items: []
            }));
          this.setState({ items: newItems });
        });
  }

  render() {
    const { listId } = this.props;
    const errors = this.state.errors;
    const items = this.state.items;

    const itemCards = items.map(item => (
      <ListItem
        key={item._id}
        listId={listId}
        item={item}
        errors={errors}
       />
    ))

    return itemCards
  }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps)(withRouter(ItemList));
