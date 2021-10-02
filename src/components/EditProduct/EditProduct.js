import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import axios from 'axios';

const EditProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const oldPrice = parseInt(props.selectedItem.price);
  const [price, setPrice] = useState(parseInt(props.selectedItem.price));
  const [error, showError] = useState(false);
  let history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    showError(false);
    if (price) {
      if (
        parseInt(price) > 1.1 * oldPrice ||
        parseInt(price) < 0.9 * oldPrice
      ) {
        showError(true);
        return false;
      } else {
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/product/${props.selectedItem._id}`,
            {
              price: price,
            }
          )
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
        setLoading(true);
      }
    } else {
      return false;
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
            Edit Product
          </h2>
          {error && (
            <p style={{ color: 'red' }}>Price can only be changed upto 10%</p>
          )}
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
                defaultValue={props.selectedItem.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Product Code</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter code"
                required
                defaultValue={props.selectedItem.productCode}
                disabled
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
                defaultValue={props.selectedItem.category}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Manufactured Date</label>
              <input
                type="date"
                className="form-control"
                defaultValue={props.selectedItem.manufacterDate}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                className="form-control"
                defaultValue={props.selectedItem.expiryDate}
                disabled
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                props.setEditView(false);
              }}
            >
              Back
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default EditProduct;
