import axios from 'axios';

import { GET_LIST, LIST_LOADING, GET_ERRORS, GET_LISTS, CLEAR_ERRORS, ADD_LIST, DELETE_LIST_ITEM, EDIT_LIST_HEADERS, EDIT_LIST_ITEM} from './types';

// List loading
export const setListLoading = () => {
  return {
    type: LIST_LOADING
  }
};

// Get all lists
export const getLists = () => dispatch => {
  dispatch(setListLoading());
  axios.get('/api/lists/all')
  .then(res =>
    dispatch({
      type: GET_LISTS,
      payload: res.data,
    })
  )
  .catch(err =>
    dispatch({
      type: GET_LISTS,
      payload: null,
    })
  );
}



// Get list by id
export const getListById = (list_id) => dispatch => {
  dispatch(setListLoading());
  axios.get(`/api/lists/${list_id}`)
  .then(res =>
    dispatch({
      type: GET_LIST,
      payload: res.data
    })
)
.catch(err =>
  dispatch({
    type: GET_LIST,
    payload: null,
  })
);
}


// Add list items
export const addListItem = (listId, listData) => dispatch => {
  dispatch(clearErrors());
  axios
  .post(`/api/lists/${listId}/add`, listData)
  .then(res =>
    dispatch({
      type: GET_LIST,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Edit list headers
export const editListHeaders = (listId, listData) => dispatch => {
  dispatch(clearErrors());
  axios
  .post(`/api/lists/${listId}`, listData)
  .then(res =>
    dispatch({
      type: EDIT_LIST_HEADERS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Edit list item
export const editListItem = (listId, itemId, itemData) => dispatch => {
  dispatch(clearErrors());
  axios
  .post(`/api/lists/${listId}/${itemId}`, itemData)
  .then(res =>
    dispatch({
      type: EDIT_LIST_ITEM,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


// Delete list items
export const deleteListItem = (listId, itemId) => dispatch => {
  dispatch(clearErrors());
  axios
  .delete(`/api/lists/${listId}/${itemId}`)
  .then(res =>
    dispatch({
      type: DELETE_LIST_ITEM,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};




// Add List
export const createList = (listData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/lists", listData)
    .then(res =>
      dispatch({
        type: ADD_LIST,
        payload: res.data
      })
    )
    .then(res => history.push(`/lists/${res.payload._id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// // Create lists
// export const createList = (listData, history) => dispatch => {
//   axios
//   .post('api/lists', listData)
//   .then(res => history.push('/dashboard'))
//   .catch(err =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     })
//   );
// };
//
//
//

// // Delete account and profile
// export const deleteAccount = () => dispatch => {
//   if(window.confirm('Are you sure? This can not be undone.')) {
//     axios
//     .delete('api/profile')
//     .then(res =>
//       dispatch({
//         type: SET_CURRENT_USER,
//         payload: {},
//       })
//     ).catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
//   }
// }
