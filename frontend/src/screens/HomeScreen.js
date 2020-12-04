//import axios from 'axios';
import Product from '../components/Product';
import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({}));
  }, []);
  return (
    <div>
      <div className="searchDiv">
                <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                ></Route>
            </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products.length === 0 ? (
        <MessageBox>
          No hay productos disponibles.
        </MessageBox>
      ) : (
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            )}
    </div>
  );

}