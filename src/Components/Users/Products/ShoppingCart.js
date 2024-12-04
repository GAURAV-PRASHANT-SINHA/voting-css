import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderItemQty,
  getCartItemsFromLocalStorageAction,
  removeOrderItemQty,
} from "../../../redux/slices/carts/cartSlice";
// import './shop.css';

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
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Cart Items */}
    <div className="col-span-2">
      {cartItems?.length > 0 ? (
        cartItems.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b py-4"
          >
            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex-grow px-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex text-sm text-gray-600">
                <p className="mr-4">{product.color}</p>
                <p>{product.size}</p>
              </div>
              <p className="text-sm font-medium mt-2">
                ${product?.price} x {product?.qty} = <strong>${product?.totalPrice}</strong>
              </p>
              
              {/* Quantity Selector */}
              <select
                className="mt-2 p-1 border rounded-md"
                onChange={(e) => changeOrderItemQtyHandler(product?._id, e.target.value)}
              >
                {[...Array(product?.qtyLeft).keys()]?.map((x) => (
                  <option key={x} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Remove Button */}
            <button
              className="text-red-500 font-semibold hover:underline"
              onClick={() => removeOrderItemQtyHandler(product?._id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
    </div>
    
    {/* Order Summary */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <dl className="space-y-4">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>${sumTotalPrice}.00</dd>
        </div>
      </dl>
      
      <Link
        to="/order-payment"
        state={{ sumTotalPrice }}
        className="mt-6 block w-full bg-blue-500 text-center text-white py-2 rounded-md hover:bg-blue-600"
      >
        Proceed to Checkout
      </Link>
    </div>
  </div>
</div>

  );
}
