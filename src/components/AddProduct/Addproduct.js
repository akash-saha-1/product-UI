import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import axios from 'axios';

const Addproduct = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [productCode, setProductCode] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [manufacterDate, setManufacterDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [owner, setOwner] = useState();
  let history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem('email') && sessionStorage.getItem('name')) {
      setVisible(true);
      setOwner(sessionStorage.getItem('email'));
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (owner) {
      setLoading(true);
      let formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('manufactureDate', manufacterDate);
      formData.append('expiryDate', expiryDate);
      formData.append('owner', owner);
      formData.append('productCode', productCode);
      formData.append('image', image);
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_URL}/product`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          console.log(response);
          history.push('/products');
        })
        .catch(function (response) {
          console.error(response);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return false;
    }
    console.log(image);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && visible && (
        <>
          <h2
            style={{ maxWidth: '700px', margin: '0 20px', marginTop: '30px' }}
          >
            Add Product
          </h2>
          <form
            onSubmit={submitForm}
            method="POST"
            style={{ maxWidth: '700px', margin: '0 20px' }}
            encType="multipart/formdata"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label>Product Code</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter code"
                required
                onChange={(e) => {
                  setProductCode(e.target.value);
                }}
                value={productCode}
              />
            </div>
            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                //value={image}
                onChange={(e) => setImage(e.target.files[0])}
                accept=".png,.jpeg,.jpg"
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              />
            </div>
            <div className="form-group">
              <label>Manufactured Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  setManufacterDate(e.target.value);
                }}
                value={manufacterDate}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  setExpiryDate(e.target.value);
                }}
                value={expiryDate}
                min={manufacterDate ? manufacterDate : ''}
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

export default Addproduct;
