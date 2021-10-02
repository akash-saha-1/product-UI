import React, { useEffect, useState, useCallback } from 'react';
import Loader from '../../Shared/Loader/Loader';
import axios from 'axios';
import EditProduct from '../EditProduct/EditProduct';
import './product.css';

const Products = () => {
  const [editView, setEditView] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [prevProducts, setPrevProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState();
  const [error, setError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    let loadData = async () => {
      setLoading(true);
      let data = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product`
      );
      setAllProducts(data.data.products);
      setPrevProducts(data.data.products);
      if (data.data.products) {
        let categoryArray = [];
        data.data.products.forEach((item) => {
          if (!categoryArray.includes(item.category.trim())) {
            categoryArray.push(item.category.trim());
          }
        });
        setCategories(categoryArray);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const searchProducts = () => {
    if (searchText === '') {
      setAllProducts(prevProducts);
      return false;
    } else {
      let newProducts = allProducts.filter(
        (item) =>
          item.name.includes(searchText) || item.category.includes(searchText)
      );
      setAllProducts(newProducts);
    }
  };

  const loadCategories = async (name) => {
    setLoading(true);
    setSelectedCategory(name);
    let data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/product/category/${name}`
    );
    setAllProducts(data.data.products);
    setLoading(false);
  };

  const datesAreOnSameDay = (first, second) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  };

  const editProduct = useCallback(
    (product) => {
      if (product.owner === userEmail) {
        if (!datesAreOnSameDay(new Date(product.priceChanged), new Date())) {
          setSelectedItem(product);
          setEditView(true);
        } else {
          setTimeError(true);
        }
      } else {
        setError(true);
      }
    },
    [userEmail]
  );

  const deleteProduct = async (product) => {
    if (product.owner === userEmail) {
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/product/${product._id}`
      );
      let newArray = allProducts.filter((item) => item._id !== product._id);
      setAllProducts(newArray);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && !editView && (
        <div className="col-12 product-wrpapper">
          <div className="input-group col-12 search-wrapper">
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={searchProducts}
            >
              <i className="fa fa-search"></i>Search
            </button>
          </div>
          <div className="col-12 filter-wrapper">
            {categories.map((category, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="filter"
                  id={index}
                  checked={category === selectedCategory ? true : false}
                  onChange={() => {}}
                  onClick={() => {
                    loadCategories(category);
                  }}
                />
                <label htmlFor={index}>{category}</label>
              </div>
            ))}
          </div>
          {error && (
            <p className="error" style={{ color: 'red' }}>
              You do not have priviledge to edit or delete the product.
            </p>
          )}
          {timeError && (
            <p className="error" style={{ color: 'red' }}>
              You can not edit same product twice in the same day.
            </p>
          )}
          <div className="col-12 products-view row">
            {allProducts &&
              allProducts.map((product, index) => (
                <div className="card col-md-4" key={index}>
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                    alt="product-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.productCode}</p>
                    <p className="card-text">{product.price}</p>
                    <p className="card-text">{product.category}</p>
                    <p className="card-text">
                      {new Date(product.expiryDate).getUTCDay() +
                        '/' +
                        new Date(product.expiryDate).getUTCMonth() +
                        '/' +
                        new Date(product.expiryDate).getUTCFullYear()}
                    </p>
                    <p className="card-text">
                      {new Date(product.expiryDate).getUTCDay() +
                        '/' +
                        new Date(product.expiryDate).getUTCMonth() +
                        '/' +
                        new Date(product.expiryDate).getUTCFullYear()}
                    </p>
                    <button
                      type="btn"
                      className="btn btn-info"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="btn"
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {!loading && editView && (
        <EditProduct
          setEditView={setEditView}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};

export default Products;
