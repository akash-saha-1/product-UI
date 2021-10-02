import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Addproduct from './components/AddProduct/Addproduct';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Header from './Shared/Header/Header';

function App() {
  const Context = createContext();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const updateEmail = (email) => {
    setEmail(email);
  };
  const updateName = (name) => {
    setName(name);
  };

  let defaultvalue = { email, name, updateEmail, updateName };

  let routes = (
    <Switch>
      <Route path="/products" exact>
        <Products />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/add-product" exact>
        <Addproduct />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Redirect to="/login" exact />
    </Switch>
  );
  return (
    <Context.Provider value={defaultvalue}>
      <Router>
        <div className="col-12">
          <Header />
        </div>
        <div className="App">{routes}</div>
      </Router>
    </Context.Provider>
  );
}

export default App;
