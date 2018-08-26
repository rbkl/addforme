import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListHeader from './ListHeader';
import ItemList from './ItemList';
import AddListItem from './AddListItem';


import { CopyToClipboard } from 'react-copy-to-clipboard';


import Spinner from '../common/Spinner';
import { getListById, getListItemsById } from '../../actions/listActions';
import { Link } from 'react-router-dom';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      textToCopy: `http://www.addfor.me/lists/${this.props.match.params.list_id}`,
      title: '',
      link: '',
      instructions: '',
      items: [],
      nameToAdd: '',
      orderToAdd: '',
      notesToAdd: '',
    }

    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.props.getListById(this.props.match.params.list_id);
}

  componentWillReceiveProps() {

  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  onClick() {
  }

  render() {
    const { list, loading } = this.props.list;

    let listContent;
    let linkCopy;


    if(list === null || loading || Object.keys(list).length === 0) {
      listContent = <Spinner />
      linkCopy = <span />;
    } else {
      listContent = (
        <div>
          <ListHeader listId={list._id} title={list.title} link={list.link} instructions={list.instructions}  />
          <hr />
          <ItemList listId={list._id} items={list.items} />
          <AddListItem listId={list._id} />
        </div>
      )
      linkCopy = (
        <div>
          <div className="input-group input-group-sm mb-3">
            <input type="text" className="form-control link-text-input" value={this.state.textToCopy} aria-describedby="basic-addon2" onChange={this.onChange}/>
            <div className="input-group-append">
              <button className="input-group-text btn btn-teal link-text-copy" id="basic-addon2" onClick={this.onClick} data-toggle="tooltip" data-event='click focus' title="Copy Link">
                <CopyToClipboard text={this.state.textToCopy}>
                  <span className="tooltiptext">Copy</span>
                </CopyToClipboard>
              </button>
            </div>
          </div>
        </div>
      )
    }



    return (
      <div className="list-page">
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to='/' className="btn btn-teal mb-3 back-to-lists">
                Home
              </Link>
            </div>
            <div className="col text-right">
              {linkCopy}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {listContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

List.propTypes = {
  getListById: PropTypes.func.isRequired,
  getListItemsById: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  items: PropTypes.array,
}

const mapStateToProps = state => ({
  list: state.list,
  items: state.list.items,
})

export default connect(mapStateToProps, { getListById, getListItemsById })(List);
