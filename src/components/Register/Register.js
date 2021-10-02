import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  const submitForm = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return false;
    } else {
      setLoading(true);
      let data = {
        name,
        email,
        password,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, data)
        .then((response) => history.push('/login'))
        .catch((err) => {
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
          <h2
            style={{ maxWidth: '700px', margin: '0 20px', marginTop: '30px' }}
          >
            Register Screen
          </h2>
          <form
            onSubmit={submitForm}
            method="POST"
            style={{ maxWidth: '700px', margin: '0 20px' }}
          >
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
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

export default Register;
