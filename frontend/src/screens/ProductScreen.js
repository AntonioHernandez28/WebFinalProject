import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link, Route } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import SearchBox from '../components/SearchBox';

export default function ProductScreen(props){
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('¡Reseña enviada exitosamente!');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Por favor ingresa clasificación y comentario');
    }
  };

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
     ) : (
       <div>
      <div>
       <Link to="/">Back to result</Link>
       <div className="row top">
         <div className="col-2">
           <img className="large" src={product.image} alt={product.name}></img>
         </div>
         <div className="col-1">
           <ul>
             <li>
               <h1>{product.name}</h1>
             </li>
             <li>
               <Rating
                 rating={product.rating}
                 numReviews={product.numReviews}
               ></Rating>
             </li>
             <li>Precio : ${product.price}</li>
             <li>
               Descripción:
               <p>{product.description}</p>
             </li>
           </ul>
         </div>
         <div className="col-1">
           <div className="card card-body">
             <ul>
               <li>
                 <div className="row">
                   <div>Precio</div>
                   <div className="price">${product.price}</div>
                 </div>
               </li>
               <li>
                 <div className="row">
                   <div>Estatus</div>
                   <div>
                     {product.countInStock > 0 ? (
                       <span className="success">Disponible</span>
                     ) : (
                       <span className="danger">Agotado</span>
                     )}
                   </div>
                 </div>
               </li>
               {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cantidad</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Agregar al carrito
                        </button>
                      </li>
                    </>
                  )}
             </ul>
           </div>
         </div>
       </div>
       <div>
            <h2 id="reviews">Reseñas</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Este producto no tiene reseñas.</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Escribe una reseña</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Clasificación</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">¿Qué te pareció el producto?</option>
                        <option value="1">1- Malo</option>
                        <option value="2">2- Regular</option>
                        <option value="3">3- Bueno</option>
                        <option value="4">4- Muy bueno</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Commentario</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Enviar
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Por favor <Link to="/signin">Inicia sesión</Link> para escribir una reseña.
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
      </div>
      </div>
      )}
     </div>
    ); 
    
}