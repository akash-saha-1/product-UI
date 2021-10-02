import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return false;
    } else {
      setLoading(true);
      let data = {
        email,
        password,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, data)
        .then((response) => {
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('email', email);
          history.push('/products');
        })
        .catch((err) => {
          sessionStorage.clear();
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <h2 style={{ maxWidth: '700px', margin: '0 20px' }}>Login Screen</h2>
          <form
            onSubmit={submitForm}
            method="POST"
            style={{ maxWidth: '700px', margin: '0 20px', marginTop: '30px' }}
          >
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
                minLength="5"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
