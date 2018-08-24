import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


import { Provider } from 'react-redux';
import store from './store';

// import PrivateRoute from './components/common/PrivateRoute';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import NotFound from './components/not-found/NotFound';
import Lists from './components/lists/Lists';
import List from './components/list/List';
import AddListItem from './components/list/AddListItem';
import CreateList from './components/create-list/CreateList';


import './App.css';

// Check for Token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Call set current user action and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired Token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login page
    window.location.href = '/login';
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing} />
              <div className="container app-pages">
                <Route exact path="/lists" component={Lists}/>
                <Route exact path="/lists/:list_id" component={List}/>
                <Route exact path="/create-list" component={CreateList}/>
                <Route exact path="/lists/:list_id/add" component={AddListItem}/>
                <Route exact path="/not-found" component={NotFound}/>
              </div>
            <Footer/>
          </div>
        </Router>
    </Provider>
    );
  }
}

export default App;
