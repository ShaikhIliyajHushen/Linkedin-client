import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Typography } from "@mui/material";
import Microsofticon from "../../assets/images/microsoft_732221.png";
import Googleicon from "../../assets/images/google_300221.png";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppTitleLogo from "../../assets/images/projam-icon.svg";
import LockIcon from "@mui/icons-material/Lock";
import "./home.scss";
import API_BASE_URL from "../../components/config/appConfig";
import { loginSchema, updatePasswordSchema, EmailVerificationSchema } from "../../Validations/schema";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CryptoJS from 'crypto-js';
import OTPInput, { ResendOTP } from "otp-input-react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState({ emailId: '', email: false, otp: false, invalidOtp: false });
  const [OTP, setOTP] = useState("");
  const [createdOtp, setCreateOtp] = useState("");
  const [resendVerify, setResendVerify] = useState(false);


  const LogoText = styled(Box)`
    font-weight: 700;
    letter-spacing: 1.4px;
    color: ##010101;
  `;


  const loginCardStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    width: "30%",
    margin: "0 auto",
    padding: "20px",
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getSendOtpToMail = async (email) => {
    const creatOtp = Math.floor(Math.random() * 899999 + 100000);
    const secretKey = 'Pr0JaM0Tp';
    // Use a strong, unique key
    const encryptedOtp = await CryptoJS.AES.encrypt(JSON.stringify(creatOtp), secretKey).toString();

    const data = {
      email: email,
      otp: encryptedOtp,
    };
    console.log(data, "data");
    try {
      const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setCreateOtp(creatOtp);
        setIsEmailVerified((prevState) => ({ ...prevState, email: true, emailId: email, otp: false, invalidOtp: false }))
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  }

  const handleSubmit = async (values) => {
    // console.log(values, "values")
    const loginData = {
      email: values.email
    };
    try {
      const response = await fetch(`${API_BASE_URL}/users/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        // const data = await response.json();
        await getSendOtpToMail(values.email);
        // setIsEmailVerified((prevState) => ({ ...prevState, email: true, emailId: values.email, otp: false, invalidOtp: false }))
      } else {
        let responsess = await response.json()
        const errorMessage = await responsess.message;
        setError(errorMessage);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log(error, 'catch')
      setError("An error occurred. Please try again later.");
      setSnackbarOpen(true);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken')
  //   if (token) {
  //     navigate("/projects");
  //   }
  // }, [])

  const handleUpdatePassword = async (values) => {
    const loginData = {
      ...values
    };
    if (values.password === values.confirmPassword) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/update-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        if (response?.ok) {
          // const data = await response.json();
          // setIsEmailVerified((prevState) => ({ ...prevState, email: true, emailId: values.email, otp: false, invalidOtp: false }))
          // const data = await response.json();

          // if (data.accessToken) {
          //   localStorage.setItem("accessToken", data.accessToken);

          navigate("/login");
          // } else {
          //   setError(
          //     "Invalid login attempt. Please check your credentials and try again."
          //   );
          //   setSnackbarOpen(true);
          // }
        } else {
          let responsess = await response.json()
          const errorMessage = await responsess.message;
          setError(errorMessage);
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.log(error, 'catch')
        setError("An error occurred. Please try again later.");
        setSnackbarOpen(true);
      }
    } else {
      setError("Passwords not matched!");
      setSnackbarOpen(true);
    }
  };

  const onChangeVerifyOtp = () => {
    // console.log(typeof OTP);
    // console.log(typeof createdOtp);
    if (OTP == createdOtp) {
      setIsEmailVerified((prevState) => ({ ...prevState, otp: true, invalidOtp: false }))
      setResendVerify(false);
    } else {
      setError("Invalid Otp, Please Try Again!");
      setSnackbarOpen(true);
      setIsEmailVerified((prevState) => ({ ...prevState, otp: false, invalidOtp: true }));
      setResendVerify(true);
      setCreateOtp("")
      setOTP('')

    }
  };


  console.log(isEmailVerified,
    "isEmailVerified"
  )
  const renderButton = (buttonProps) => {
    return <div className="d-flex align-items-center">
      {!isEmailVerified?.invalidOtp ? <><button
        disabled={OTP.length !== 6}
        className="btn btn-success"
        onClick={onChangeVerifyOtp}
      >
        Verify Otp
      </button>

        <p className="mx-3 text-center mt-3 fw-bold">Or</p></> : null}
      <button
        {...buttonProps}
        className="btn btn-secondary"
        //onResendClick={() => onChangeOtp()}
        disabled={!resendVerify}
      >
        Resend Otp
      </button>
    </div>

  };
  const renderTime = (remainingTime) => {
    return (!resendVerify && remainingTime !== 0) ? <span>{remainingTime} seconds remaining</span> : "";
  };



  return (
    <Box className='login-page-cls'>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', width: '100px' }}
        autoHideDuration={6000}
      >
        <Alert onClose={handleSnackbarClose}
          severity="error"
          iconMapping={{
            error: <ErrorOutlineIcon style={{ fontSize: 25 }} />,
          }}
          sx={{
            width: '300px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Box
        sx={loginCardStyles}
        className="d-flex flex-column p-5 shadow login-card-styles"
      >
        <Typography
          noWrap
          className="text-center mb-1 d-flex align-items-center justify-content-center"
        >
          <img
            src={AppTitleLogo}
            alt="App-Title-Logo"
            height={40}
            className="me-1"
          />
          <LogoText fontSize={'20px !important'}>Projam Software</LogoText>
        </Typography>
        <Typography className="text-center mb-2 mt-0" sx={{ fontWeight: 500 }}>
          Enter Email To continue
        </Typography>
        {(!isEmailVerified?.email || !isEmailVerified?.otp) ?
          !isEmailVerified?.email ? <Formik
            initialValues={{
              email: ""
            }}
            validationSchema={EmailVerificationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, error }) => (
              <Form className="mt-3">
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      size='small'
                      fullWidth
                      className="mt-2"
                      InputProps={{
                        endAdornment: <EmailIcon />,
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="span"
                  sx={{ fontSize: "12px" }}
                  className="error-message text-danger"
                />
                < Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="mt-3 mb-3 Login-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "email verifying..." : "Continue"}
                </Button>
              </Form>
            )}
          </Formik> : (
            <div className="d-flex flex-column align-items-center py-4">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={createdOtp?.toString()?.length === 6 ? false : true}
                secure
                inputClassName="input-class-name"
              />
              {/* <button
                disabled={OTP.length !== 6}
                className="btn btn-success mt-3"
                onClick={onChangeVerifyOtp}
              >
                Verify Otp
              </button> */}
              <ResendOTP
                onResendClick={() => getSendOtpToMail(isEmailVerified?.emailId)}
                className=" d-flex flex-column align-items-center my-3 resend-otp"
                renderButton={renderButton}
                renderTime={renderTime}
              />
            </div>
          ) : <Formik
            initialValues={{
              email: isEmailVerified?.emailId,
              password: '',
              confirmPassword: ''
            }}
            validationSchema={updatePasswordSchema}
            onSubmit={handleUpdatePassword}
          >
            {({ isSubmitting, error }) => (
              <Form className="mt-3">
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      size='small'
                      disabled={isEmailVerified?.emailId}
                      fullWidth
                      className="mt-2"
                      InputProps={{
                        endAdornment: <EmailIcon />,
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="span"
                  sx={{ fontSize: "12px" }}
                  className="error-message text-danger"
                />

                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      variant="outlined"
                      size='small'
                      fullWidth
                      type="password"
                      className="mt-2"
                      InputProps={{
                        endAdornment: <LockIcon />,
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="span"
                  sx={{ fontSize: "12px" }}
                  className="error-message text-danger"
                />

                {error && <div className="error-message">{error}</div>}
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      variant="outlined"
                      size='small'
                      fullWidth
                      type="password"
                      className="mt-2"
                      InputProps={{
                        endAdornment: <LockIcon />,
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  sx={{ fontSize: "12px" }}
                  className="error-message text-danger"
                />

                {error && <div className="error-message">{error}</div>}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="mt-3 mb-3 Login-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Continue"}
                </Button>
              </Form>
            )}
          </Formik>}
      </Box>
    </Box >
  );
};

export default ForgotPassword;
