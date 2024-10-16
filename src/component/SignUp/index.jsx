import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Divider } from 'antd';
import google from './google.png'
import { useState } from 'react';
import UserName from './UserName';
import { notification } from 'antd';
import React, { useMemo } from 'react';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';
import { apiFetch } from '../api/api_Endpoints';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

function BasicExample() {
  const navigate = useNavigate();
  const [linkedId, setLinkedId] = useState()
  // const [showAnotherCard, setShowAnotherCard] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [save, setSave] = useState(false)
  let a = localStorage.getItem("id");

  const { setShowAnotherCard, showAnotherCard } = useContext(UserContext);

  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    console.log(user)
    // navigate("/Feed");
  }




  const Context = React.createContext({
    name: 'Default',
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification`,
      description: <Context.Consumer>{({ name }) => `Email ${name}!`}</Context.Consumer>,
      placement,
    });
  }

  const contextValue = useMemo(
    () => ({
      name: 'Allready Existed'
    }),
    [],
  );

  // const handleEmail = (e) => {
  //   let email = e.target.value;
  //   if (!email.match(ergx)) {
  //     setEmailError(true)
  //     return;
  //   }
  //   else {
  //     setEmailError(false)
  //   }
  //   setEmail(email)
  // }

  // const handlePassword = (e) => {
  //   let password = e.target.value;
  //   if (!password.match(prgx)) {
  //     setPasswordError(true)
  //     return;
  //   }
  //   else {
  //     setPasswordError(false)
  //   }
  //   setPassword(password)
  // }

  const handleEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
    if (!email.match(ergx)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
    if (!password.match(prgx)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };


  // const handleSubmitFun = async (e) => {
  //   e.preventDefault();
  //   let email = e.target.email.value; 
  //   let password = e.target.password.value;
  //   let isValid = true;
  //   if (!email.match(ergx)) {
  //     setEmailError(true);
  //     isValid = false; 
  //   } else {
  //     setEmailError(false);
  //   }
  //   if (!password.match(prgx)) {
  //     setPasswordError(true);
  //     isValid = false; 
  //   } else {
  //     setPasswordError(false);
  //   }
  //   // Only proceed if all validations pass
  //   // if (isValid) {
  //   //   setShowAnotherCard(true);
  //   // }
  //   try {
  //     const requestBody = {
  //       email: email,
  //       password: password,
  //     };
  //     const res = await apiFetch('GET_ALL_SIGNUP', {}, 'POST', requestBody);
  //     console.log("res", res);
  //     if (res.status === 409 || res.message === 'Email already exists' || res.status === 400 || res.message === 'Please enter a valid email') {
  //       openNotification('topLeft');
  //     } else {
  //       handleEmailSend()
  //       if (isValid) {
  //         setShowAnotherCard(true);
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error object:', err);
  //   }
  // };


  // const handleJoinClick = async (e) => {
  // e.preventDefault();

  // let email = e.target[0].value;
  // if (!email.match(ergx)) {
  //   setEmailError(true)
  // }
  // else {
  //   setEmailError(false)
  // }

  // let password = e.target[1].value;
  // if (!password.match(prgx)) {
  //   setPasswordError(true)
  // }
  // else {
  //   setPasswordError(false)
  // }
  //   const requestBody = {
  //     email: email,
  //     password: password
  //   };
  //   try {
  //     const res = await apiFetch('GET_ALL_SIGNUP', {}, 'POST', requestBody);
  //     // console.log("Response received:", res);
  //     handleEmailSend()
  //     if (res.message) {
  //       openNotification('topLeft');
  //     }
  //     // setShowAnotherCard(true);
  //     setLinkedId(res._id)
  //     localStorage.setItem("id", res._id);
  //   } catch (error) {
  //     console.error("API call failed:", error); 
  //   }
  // };

  // console.log(a);


  // console.log("linkedId",linkedId)


  const handleSubmitFun = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let isValid = true;

    if (!email.match(ergx)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password.match(prgx)) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (isValid) {
      try {
        setLoading(true);
        setSave(true)
        const requestBody = {
          email: email,
          password: password,
        };
        const res = await apiFetch('GET_ALL_SIGNUP', {}, 'POST', requestBody);
        // console.log("res.status =>", res.status);
        setLinkedId(res._id)
        if (res.status === 409) {
          setResponseMessage(res.data?.message || 'Email already exists');
          openNotification('topLeft');
          setSave(false)
        } else if (res.status === 400) {
          setResponseMessage(res.data?.message || 'Please enter a valid email');
          openNotification('topLeft');
          setSave(false)
        } else {
          setLinkedId(res._id);
          handleEmailSend();
          setShowAnotherCard(true);
        }
      } catch (err) {
        console.error('Error object:', err); 
        if (err.status === 409) {
          setResponseMessage(err.data?.message || 'Email already exists');
        } else if (err.status === 400) {
          setResponseMessage(err.data?.message || 'Please enter a valid email');
          openNotification('topLeft'); 
        } else {
          setResponseMessage('An unexpected error occurred.');
          openNotification('topLeft');
        }
      } finally {
        setLoading(false);
        setSave(false)
      }
    }
  };

  const sendEmail = async (to, subject, htmlContent, name) => {
    const sendarDetails = {
      to: to,
      subject: subject,
      html: htmlContent,
      recipientName: email
    }
    try {
      const res = await apiFetch('SEND_EMAIL_NOTIFICATION', {}, 'POST', sendarDetails);
      console.log('Email sent', res);
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  const emailContent = `Congratilation your linkedin account is created ,Please update your profile`;

  const handleEmailSend = () => {
    sendEmail(email, 'Linkedin Account is created', emailContent,);
  }

  return (<>
    <div className='Navsection d-flex flex-column'>
      <div>
        <Navbar className='navbarSignUp' bg='light' expand="lg">
          <Container >
            <Navbar.Brand href="/login">
              <img className='linkedInNav' src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo.png" alt="" />
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler' /> */}
          </Container>
        </Navbar>
      </div>

      <div className='d-flex justify-content-center heading'>
        Make the most of your professional life
      </div>
      <div className='CenterContent d-flex justify-content-center'>
        <div className='textAlign-center'>
          <div className='signUp mt-3'>
            <div>
              {loading ? <Box sx={{ width: '96%', marginLeft: '8px' }}>
                <LinearProgress />
              </Box> : responseMessage && <div style={{ color: 'red',textAlign:'center'}}>{responseMessage}</div>}
            </div>
            <div>
              {showAnotherCard ? (
                <UserName linkedId={linkedId} email={email} password={password} setShowAnotherCard={setShowAnotherCard} />
              ) : (<>

                <Form onSubmit={handleSubmitFun} className='p-4'>
                  <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <label className='labelEmail mt-2 mb-1'>Email or phone number</label>
                    <div>
                      <input className='inputSign' type="text" name="email" onChange={handleEmail} value={email} />
                    </div>
                  </Form.Group>
                  {emailError ? <span style={{ color: 'red' }}>Invalid Email</span> : ""}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label className='labelEmail mb-1'>Password (6 or more characters)</label>
                    <div>
                      <input className='inputSign' type="password" value={password} onChange={handlePassword} name="password" />
                    </div>
                  </Form.Group>
                  {passwordError ? <span style={{ color: 'red' }}>uppercase letter, one digit, and one special character</span> : ""}
                  <p className='text-center'>By clicking Agree & Join, you agree to the LinkedIn <span className='text-primary fw-bold'> User Agreement, Privacy Policy,</span> and <span className='text-primary fw-bold'>Cookie Policy.</span> </p>
                  <Button type='submit' className='agreeBtn' disabled={save}>{save ? "Joining..." : " Agree & Join"}</Button>
                  <Divider><span className='or'>Or</span></Divider>
                  {/* <Button onClick={() => loginWithRedirect()} className='google'> <span ><img className='googleImg' src={google} alt="" /></span> <span className=''>Continue with Google</span> </Button> */}
                  <h6 className='mt-3 d-flex justify-content-center'>Already on LinkedIn? <span className='text-primary ms-1 siginLink'> <a href="/">Sign in</a></span></h6>
                </Form>
              </>)}
            </div>
          </div >
        </div>
        <Context.Provider value={contextValue}>
          {contextHolder}
        </Context.Provider>
      </div>

      <div className='bottomText mt-3'>
        <p > Looking to create a page for a business? <span className='text-primary'> Get help </span></p>
      </div>

      <div className='footer d-flex justify-content-center p-3'>
        <img className='foterLinkdn me-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png" alt="" />
        <p className='me-3'>@ 2023</p>
        <p className='me-3'>About</p>
        <p className='me-3'>Accessibility</p>
        <p className='me-3'>User Agreement</p>
        <p className='me-3'>Privacy Policy</p>
        <p className='me-3'>Cookie Policy</p>
        <p className='me-3'>Copyright Policy</p>
        <p className='me-3'>Brand Policy</p>
        <p className='me-3'>Guest Controls</p>
        <p className='me-3'>Community Guidelines</p>
        <p className='me-3'>Language</p>
      </div>
    </div >
  </>
  );
}

export default BasicExample;