import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import RegisterForm from "./Components/Users/Forms/RegisterForm.js";
import Header from "./Components/Header/Header"; // Import the Header component
import Login from "./Components/Users/Forms/Login";
import Billing from "./Pages/Billing/Billing.js";
import ShoppingCart from "./Components/Users/Products/ShoppingCart.js";
import OrderPayment from "./Components/Users/Products/OrderPayment.js";
import CustomerProfile from "./Components/Users/Profile/CustomerProfile.js";
import ProductUpdate from "./Components/Admin/Products/ProuductUpdate";
import UpdateOrders from "./Components/Admin/Orders/UpdateOrders";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddProduct from "./Components/Admin/Products/AddProduct";
import OrderHistory from "./Components/Admin/Orders/ManageOrders";
import OrdersList from "./Components/Admin/Orders/OdersList";
import ManageOrders from "./Components/Admin/Orders/ManageOrders";
import ThanksForOrdering from "./Components/Users/Products/ThanksForOrdering";
import Customers from "./Components/Admin/Orders/Customers";
import ManageStocks from "./Components/Admin/Products/ManageStocks";
// import AuthRoute from "./components/AuthRoute/AuthRoute";
// import AdminRoutes from "./components/AuthRoute/AdminRoutes";


function App() {
  const [showOnlyCart, setShowOnlyCart] = useState(false);

  const handleOpenCart = () => {
    setShowOnlyCart(true); // Toggle to show only the Cart
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="admin"
          element={
            
              <AdminDashboard />
          
          }
        >
          {/* products */}
          <Route
            path=""
            element={
            
                <OrdersList />
            
            }
          />
          <Route
            path="add-product"
            element={
          
                <AddProduct />
              
            }
          />
          <Route
            path="manage-products"
            element={
        
                <ManageStocks />
              
            }
          />
          <Route
            path="products/edit/:id"
            element={
              
                <ProductUpdate />
              
            }
          />
           <Route
            path="customers"
            element={
              
                <Customers />
              
            }
        />  
        
         <Route
            path="orders/:id"
            element={
            
                <UpdateOrders />
          
            }
          />
          {/* <Route
            path="customers"
            element={
              <AdminRoutes>
                <Customers />
              </AdminRoutes>
            } */}
          
        </Route>
      <Route path="/success" element={<ThanksForOrdering />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/checkout" element={<Billing />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/order-payment" element={<OrderPayment />} />
        <Route path="/customer-profile" element={      <CustomerProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
