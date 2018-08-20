import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ListItem from './ListItem';
import { getLists } from '../../actions/listActions';

class Lists extends Component {
  componentDidMount() {
    this.props.getLists();
  }

  render() {
    const lists = this.props.list.lists;
    const loading = this.props.list.loading;
    let listItems;

    if (lists === null || loading) {
      listItems = <Spinner />;
    } else {
      if (lists.length > 0) {
        listItems = lists.map(list => (
          <ListItem key={list._id} list={list} />
        ))
      } else {
        listItems = <h4>No lists found...</h4>;
      }
    }

    return (
      <div className='profiles'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Lists
              </h1>
              <p className="lead text-center">
                See all open lists
              </p>
              {listItems}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Lists.propTypes = {
  getLists: PropTypes.func.isRequired,
  lists: PropTypes.object,
}

const mapStateToProps = state => ({
  list: state.list,
});

export default connect(mapStateToProps, { getLists })(Lists);
