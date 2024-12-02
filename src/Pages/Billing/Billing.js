// src/pages/Billing/Billing.js
import React from "react";
import "./Billing.css"; // Custom styles for billing page

const Billing = () => {
  return (
    <div className="billing-container">
      <h1>Billing Details</h1>
      <p>Enter your payment and shipping details below.</p>
      <form className="billing-form">
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Payment Method:
          <select name="paymentMethod">
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button type="submit" className="submit-button">Submit Payment</button>
      </form>
    </div>
  );
};

export default Billing;
