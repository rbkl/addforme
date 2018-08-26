import { GET_LIST, LIST_LOADING, GET_LISTS, DELETE_LIST_ITEM, GET_LIST_ITEMS } from '../actions/types';

const initialState = {
  list: null,
  lists: null,
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LIST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case GET_LIST_ITEMS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case DELETE_LIST_ITEM:
      return {
        ...state,
        loading: false
      }
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
