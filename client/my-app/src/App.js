import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/groups/Dashboard';
import GroupDetail from './components/groups/GroupDetail';
import CreateGroup from './components/groups/CreateGroup';
import axios from 'axios';

axios.defaults.baseURL = 'https://splitwise-app.onrender.com'; // Assuming your Node.js server is running on port 5000

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/groups/:groupId" component={GroupDetail} />
          <Route path="/create-group" component={CreateGroup} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
