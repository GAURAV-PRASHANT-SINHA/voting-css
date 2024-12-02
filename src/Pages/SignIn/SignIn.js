import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignIn.css"; // Custom styles
import GoogleImg from "../../assets/images/googleImg.png"; // Adjusted path

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Replace with actual sign-in logic
    navigate("/"); // Redirect after sign-in
  };

  const handleGoogleSignIn = () => {
    // Here, you can add your Google sign-in logic
    console.log("Google Sign-In clicked");
    // Redirect or perform Google sign-in
    navigate("/"); // Redirect after Google sign-in
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="password-field">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <div>
            <Link to="/forgot-password" className="border-effect">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="sign-in-button-container">
          <button type="submit">Sign In</button>
          <button type="button" className="cancel" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>

      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
      <div className="cursor">
        <button onClick={handleGoogleSignIn} style={{ background: 'none', border: 'none', padding: 0 }}>
          <img src={GoogleImg} alt="Sign in with Google" className="w-100" />
        </button>
      </div>
    </div>
);

};

export default SignIn;
