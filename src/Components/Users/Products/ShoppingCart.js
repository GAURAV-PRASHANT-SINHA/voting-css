import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderItemQty,
  getCartItemsFromLocalStorageAction,
  removeOrderItemQty,
} from "../../../redux/slices/carts/cartSlice";
import './shop.css';

export default function ShoppingCart() {
  // Dispatch to trigger actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  // Get cart items from the store
  const { cartItems } = useSelector((state) => state?.carts);

  // Calculate total price
  let sumTotalPrice = 0;
  sumTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);

  // Add item quantity handler
  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeOrderItemQty({ productId, qty }));
    dispatch(getCartItemsFromLocalStorageAction());
  };

  // Remove item handler
  const removeOrderItemQtyHandler = (productId) => {
    dispatch(removeOrderItemQty(productId));
    dispatch(getCartItemsFromLocalStorageAction());
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems?.map((product) => (
          <div key={product._id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <div className="color-size">
                <p>{product.color}</p>
                <p>{product.size}</p>
              </div>
              <p className="price">
                ${product?.price} x {product?.qty} = ${product?.totalPrice}
              </p>
              <select
                onChange={(e) =>
                  changeOrderItemQtyHandler(product?._id, e.target.value)
                }
              >
                {[...Array(product?.qtyLeft)?.keys()]?.map((x) => (
                  <option key={x} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                className="remove-btn"
                onClick={() => removeOrderItemQtyHandler(product?._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <dl>
          <div className="order-summary-item">
            <dt>Subtotal</dt>
            <dd>$ {sumTotalPrice}.00</dd>
          </div>
        </dl>

        <Link
          to="/order-payment"
          state={{ sumTotalPrice }}
          className="btn-checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
