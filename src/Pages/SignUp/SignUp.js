import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; // Add your custom styles here
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // You can add logic to register the user here
      console.log("Email:", email);
      console.log("Password:", password);
      // On successful sign up, navigate to sign in page
      navigate("/sign-in");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="email"
                      />
        </div>
        <div>
          <label>Password:</label>
          <input
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="password"
                    placeholder="Enter your password"
                  />
        </div>
        <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already registered? <Link to="/sign-in">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
