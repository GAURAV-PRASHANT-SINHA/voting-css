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
import '../Header.css';
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
      <div className={`headerWrapper ${openDialog ? 'dialogBackdropBlur' : ''}`}>
        <div className={`top-strip`}>
          <div className="container">
            <span className="marquee"><IoWaterOutline  /> &nbsp; Only in <b>Patna</b> at the moment  &nbsp; <IoWaterOutline  /></span>
          </div>
        </div>
      </div>

      <div className={`Header ${openDialog ? 'dialogBackdropBlur' : ''}`}>
        <div className="container">
          <div className="header d-flex align-items-center justify-content-between">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to={'/'}>
                <img src={hee} alt="logo" />
                
              </Link>
            </div>
            
            
            <div className="part3 d-flex align-items-center ml-auto">
              <div className="position-relative mr-2 cartTab">
              <Button className="circle button" onClick={openCartInNewTab}>
                  <span className="count">{cartCount}</span>
                  <FiShoppingCart className="sizebutton" />
                </Button>
                
                {
  userInfo ? (
    <Link to="/customer-profile">
      <CgProfile />
    </Link>
  ) : (
    <Button onClick={goToSignUp} className="btn-blue btn-round mr-3">
      Sign In
    </Button>
  )
}
                
              </div>
              
            </div>
          </div>

          <div className="product_row w-100 d-flex justify-content-center">
            <div className="item productItem d-flex flex-column align-items-center">
              <div className="imgWrapper" style={{ position: "relative" }}>
                <img src={products.data[0].image} alt="Product Jar" className="productImage" />
                <Button
                  variant="text"
                  onClick={handleDialogOpen}
                  className="expandButton"
                  style={{ position: "absolute", top: "50px", left: "150px", color: "#000" }}
                >
                  <LuExpand size={24} />
                </Button>
              </div>

              

              <p className="price mt-3"><strong>Price:</strong> Rs.  ${products.data[0].price}</p>
              {products.data[0].qtyLeft <= 0 ? (
                <button
                  style={{ cursor: "not-allowed" }}
                  disabled
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-whitefocus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() => addToCartHandler()}
                >
                  Add to cart
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

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <BsHourglassSplit size={32} /> {/* Corrected usage */}
            <h4>Reliable Delivery</h4>
            <p>You don't need to chase local vendors anymore. We bring the water to your doorstep daily 8 am to 8 pm.</p>
          </div>
          <div className="footer-section">
            <FiShoppingCart size={32}/>
            <h4>Extreme Convenience</h4>
            <p>You can quick an order in a few clicks and receive notifications about their order status and track deliveries in real time.

</p>
          </div>
          <div className="footer-section">
            < BiSupport size={32}/>
            <h4>Quick Support</h4>
            <p>  it as quickly as possible.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Header;
