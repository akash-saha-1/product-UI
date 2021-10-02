import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className="col-12 row header">
        <div className="col-md-3 title">
          <h3>Product App</h3>
        </div>
        <div className="col-md-2">
          <Link to="/login">Login</Link>
        </div>
        <div className="col-md-2">
          <Link to="/register">Register</Link>
        </div>
        <div className="col-md-2">
          <Link to="/products">Products</Link>
        </div>
        <div className="col-md-3">
          <Link to="/add-product">Add Product</Link>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
