import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { LuExpand, LuX } from "react-icons/lu";
import { BsHourglassSplit } from "react-icons/bs";
import logo1 from '../../assets/images/logo1.jpg';
import jar from '../../assets/images/jar.jpeg';
import clickSound from '../../assets/sounds/click.mp3';
// import '../Header.css';
import { BiSupport } from "react-icons/bi";
import {
  addOrderToCartaction,
  getCartItemsFromLocalStorageAction,
} from "../../redux/slices/carts/cartSlice";
import { IoWater } from "react-icons/io5";
import headd from '../../assets/images/headd.png';
import he from '../../assets/images/he.png';
import hee from '../../assets/images/hee.png';
import { IoWaterOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../redux/slices/products/productSlices";

const Header = () => {
 

  const userInfo = localStorage.getItem('userInfo');
  const basePrice = 40;
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
 

  const clickAudio = new Audio(clickSound);

  const openCartInNewTab = () => {
    window.open("/Cart", "_self");
  };

 
  const handleDialogOpen = () => {
    setOpenDialog(true);
    clickAudio.play();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

 


  const goToSignUp = () => {
    navigate("/sign-in"); // Redirect to the SignUp page
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsAction()
    );
  }, [dispatch]);
  const {
    products,
    error,
    loading,
  } = useSelector((state) => state?.products);
  const navigate = useNavigate();


  if (loading) {
    return <h2 className="text-center text-xl text-gray-500">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-xl text-red-500">Error: {error}</h2>;
  }

  if (!products||!products.data||!products.data[0].image) {
    return <h2 className="text-center text-xl text-gray-500">No Product found.</h2>;
  }
  const addToCartHandler = () => {
    //check if product is in cart
  
    //check if color/size selected
   
   
    dispatch(
      addOrderToCartaction({
        _id: products.data[0]._id,
        name: products.data[0].name,
        qty: 1,
        price: products.data[0].price,
     
        image: products.data[0].image,
        totalPrice: products.data[0].price,
        qtyLeft: products.data[0].qtyLeft
      })
    );
  
    
  // Navigate to the shopping cart
  navigate('/shopping-cart');
  };







// console.log(products.data)
  return (
    <>
    <div className={`headerWrapper ${openDialog ? 'blur-sm' : ''}`}>
  {/* Top Announcement Bar */}
  <div className="bg-blue-500 py-2">
    <div className="container mx-auto">
      <span className="text-white text-sm flex justify-center items-center space-x-2">
        <IoWaterOutline className="inline-block" />
        <span>
          Only in <b>Patna</b> at the moment
        </span>
        <IoWaterOutline className="inline-block" />
      </span>
    </div>
  </div>
</div>


<div className={`${openDialog ? "blur-sm" : ""} bg-white shadow-md`}>
  <div className="container mx-auto px-4">
    {/* Header Top Section */}
    <div className="flex items-center justify-between py-4">
      {/* Logo Section */}
      <div className="w-1/4">
        <Link to="/">
          <img src={hee} alt="logo" className="w-20" />
        </Link>
      </div>

      {/* Cart and User Profile Section */}
      <div className="flex items-center space-x-6">
        {/* Cart Icon */}
        <div className="relative">
          <button
            className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            onClick={openCartInNewTab}
          >
            <FiShoppingCart className="text-2xl text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile or Sign In */}
        {userInfo ? (
          <Link to="/customer-profile">
            <CgProfile className="text-2xl text-gray-700 hover:text-gray-900" />
          </Link>
        ) : (
          <button
            onClick={goToSignUp}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        )}
      </div>
    </div>

    {/* Product Row Section */}
    <div className="flex justify-center items-center py-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* Product Image */}
        <div className="relative w-48 h-56 bg-gray-100 rounded-md overflow-hidden shadow-lg">
  <img
    src={jar}
    alt="Product Jar"
    className="w-full h-full object-contain" // Ensures the entire image fits within the box
  />
  <button
    className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
    onClick={handleDialogOpen}
  >
    <LuExpand size={24} />
  </button>
</div>


        {/* Product Price and Add to Cart */}
        <p className="mt-4 text-lg font-semibold text-gray-800">
          <strong>Price:</strong> Rs. ${products.data[0].price}
        </p>
        {products.data[0].qtyLeft <= 0 ? (
          <button
            disabled
            className="mt-4 w-full py-2 bg-gray-400 text-white font-medium rounded-md cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : (
          <button
            onClick={addToCartHandler}
            className="mt-4 w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  </div>
</div>


      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm" className="dialogBackground">
        <DialogTitle>
          Product Details
          <Button
            onClick={handleDialogClose}
            style={{ position: "absolute", top: "10px", right: "10px", color: "#000" }}
          >
            <LuX size={24} />
          </Button>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="expandedContent d-flex">
            <div className="imgWrapper" style={{ marginRight: "20px" }}>
              <img src={jar} alt="Product Jar" className="productImage" />
            </div>
            <div className="productDescription text-left">
              <h3>R.O Water</h3>
              <p>
                <b>Capacity:</b> 20 liters<br /><br />
                <b>Advanced Filtration:</b> Multi-stage RO filtration<br /><br />
                <b> Fresh:</b> Each jar is securely sealed to prevent contamination and ensure freshness on delivery.<br />
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-800 text-white py-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    {/* Reliable Delivery */}
    <div className="flex flex-col items-center text-center">
      <BsHourglassSplit size={40} className="text-yellow-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2">Reliable Delivery</h4>
      <p className="text-sm">
        You don't need to chase local vendors anymore. We bring the water to your doorstep daily from 8 am to 8 pm.
      </p>
    </div>
    
    {/* Extreme Convenience */}
    <div className="flex flex-col items-center text-center">
      <FiShoppingCart size={40} className="text-blue-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2">Extreme Convenience</h4>
      <p className="text-sm">
        Place orders in a few clicks and receive notifications about their status. Track deliveries in real time.
      </p>
    </div>
    
    {/* Quick Support */}
    <div className="flex flex-col items-center text-center">
      <BiSupport size={40} className="text-green-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2">Quick Support</h4>
      <p className="text-sm">
        We're here to assist you promptly with any concerns or issues.
      </p>
    </div>
  </div>
</footer>

    </>
  );
};

export default Header;
