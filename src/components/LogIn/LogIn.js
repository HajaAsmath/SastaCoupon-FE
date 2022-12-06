/* eslint-disable prefer-const */
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./LogIn.css";
import { useAuth } from "../../Context/AuthProvider";

export default function LogIn(props) {
  const { isLogin = false } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  let [isSignIn, setIsSignIn] = useState(false);

  const redirect = location.state?.path || "/";

  const handleSubmit = async (e, isGuestSignIn) => {
    let result;
    if (isGuestSignIn) {
      setIsSignIn(true);
      isSignIn = true;
    }
    if (isSignIn) {
      if (isGuestSignIn) {
        setIsGuestLoading(true);
        result = await signIn("test@pestoproject.com", "123456");
      } else {
        setIsLoading(true);
        e.preventDefault();
        result = await signIn(
          emailRef.current.value,
          passwordRef.current.value
        );
      }
    } else {
      e.preventDefault();
      result = await signUp(emailRef.current.value, passwordRef.current.value);
    }
    if (result === "Success") {
      setIsGuestLoading(false);
      setIsLoading(false);
      navigate(redirect);
    } else {
      setIsGuestLoading(false);
      setIsLoading(false);
      setError(result);
    }
  };

  useEffect(() => {
    document.querySelector(".nav").style.margin = "0px 0px 554px 0px";
    return () => {
      document.querySelector(".nav").style.margin = "0px 0px 0px 0px";
    };
  }, [location]);

  return (
    <Box className="login-container">
      <Box className="login-box">
        <span
          className="material-icons close-login"
          onClick={() => navigate("/", { replace: true })}
        >
          cancel
        </span>
        {isLogin ? <h1>Sign In</h1> : <h1>Sign Up</h1>}
        <p>Buy and sell coupons from various platforms</p>
        <Box component="form" className="login-form" onSubmit={handleSubmit}>
          <Box className="email-box">
            <span className="material-icons">email</span>
            <TextField
              inputRef={emailRef}
              className="email-input"
              type="email"
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              required
            />
          </Box>
          <Box className="email-box">
            <span className="material-icons">lock</span>
            <TextField
              inputRef={passwordRef}
              className="email-input"
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
            />
          </Box>
          <Typography className="error-text">{error}</Typography>
          {isLogin ? (
            <LoadingButton
              type="submit"
              onClick={() => {
                setIsSignIn(true);
              }}
              loading={isLoading}
              sx={{
                background: "linear-gradient(90deg, #2FB8FF 0%, #9EECD9 100%)",
                margin: "15px 0px",
                borderRadius: 50,
                width: "290px",
              }}
              size="large"
              variant="contained"
            >
              Sign In
            </LoadingButton>
          ) : (
            <LoadingButton
              type="submit"
              onClick={() => {
                setIsSignIn(false);
              }}
              loading={isLoading}
              sx={{
                background: "linear-gradient(90deg, #2FB8FF 0%, #9EECD9 100%)",
                margin: "15px 0px",
                borderRadius: 50,
                width: "290px",
              }}
              size="large"
              variant="contained"
            >
              Sign Up
            </LoadingButton>
          )}
        </Box>
        <p>Or</p>
        <LoadingButton
          loading={isGuestLoading}
          type="submit"
          size="large"
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #2FB8FF 0%, #9EECD9 100%)",
            color: "white",
            margin: "0px 0px 15px 0px",
            borderRadius: 50,
            width: "290px",
          }}
          onClick={() => {
            handleSubmit(null, true);
          }}
        >
          Login as guest
        </LoadingButton>
        <div className="line" />
        <Box className="signup-message">
          {isLogin ? (
            <>
              <span>Don&apos;t have an account? </span>
              <Link to="/signUp">Sign Up</Link>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <Link to="/logIn">Sign In</Link>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
