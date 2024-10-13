import { useState } from 'react'
import './index.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Divider } from 'antd';
import { useNavigate } from 'react-router';
import { notification } from 'antd';
import React, { useMemo } from 'react';
import jwt_decode from "jwt-decode";
// import jwt from 'jsonwebtoken';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import google from './google.png'
import { useAuth0 } from "@auth0/auth0-react";
import { API_ENDPOINTS, apiFetch } from '../api/api_Endpoints';

function Index() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState(false);
    const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const { setFirstname, setLastname, setLinkedOneId } = useContext(UserContext);


    const { loginWithRedirect, user, isAuthenticated, getIdTokenClaims } = useAuth0();
    if (isAuthenticated) {
        console.log(user)
        console.log(user.email)

        // navigate("/Feed");
    }


    const Context = React.createContext({
        name: 'Empty',
    });

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{({ name }) => `User ${name}!`}</Context.Consumer>,
            placement,
        });
    }

    const contextValue = useMemo(
        () => ({
            name: 'Not Existed'
        }),
        [],
    );

    // const handleEmail = (e) => {
    //     let email = e.target.value;
    //     if (!email.match(ergx)) {
    //         setEmailError(true)
    //     }
    //     else {
    //         setEmailError(false)
    //     }
    //     setEmail(email)
    // }

    // const handlePassword = (e) => {
    //     let password = e.target.value;
    //     if (!password.match(prgx)) {
    //         setPasswordError(true)
    //     }
    //     else {
    //         setPasswordError(false)
    //     }
    //     setPassword(password)
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

    const handleJoinClick = async (e) => {
        e.preventDefault();

        let email = e.target[0].value;
        if (!email.match(ergx)) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }

        let password = e.target[1].value;
        if (!password.match(prgx)) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
        const requestBody = {
            email: email,
            password: password

        };
        try{
        const res = await apiFetch('LOGIN_DETAILS', {}, 'POST', requestBody);
        if (res.token) {
            console.log(res.token)
            localStorage.setItem("Token", res.token)
            const decodedToken = jwt_decode(res.token)
            const { firstname, lastname, id } = decodedToken;
            setFirstname(firstname);
            setLastname(lastname);
            setLinkedOneId(id);
            localStorage.setItem("id", id);
            let a = localStorage.getItem("id");
            if (email && password && res.token) {
                navigate("/Feed");
            }
        }
    }
    catch(err){
        if (err.status === 404 || err.message === 'User not found') {
            console.log('Email already exists, navigating to create account page.');
            openNotification('topLeft');
          } else {
            console.error('Other error:', err);
         
          }
    };
}



    const handleGoogleLogin = async () => {
        await loginWithRedirect();
        if (isAuthenticated) {
            const requestBody = {
                email: user.email,
                firstname: user.family_name,
                lastname: user.given_name,
                profile: user.picture
            };

            // fetch("http://localhost:3003/GoogleAuth", {
            //     method: "POST",
            //     body: JSON.stringify(requestBody),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            // .then((res) => res.json())
            // .then((res) => { 
            //     console.log(res);
            const res = await apiFetch('GOOGLE_AUTH_LOGIN', {}, 'POST', requestBody);
            if (res.token) {
                localStorage.setItem("Token", res.token);
                navigate('/Feed');
            }
            // })
            // .catch((error) => {
            //     console.error("Error:", error);
            // });
        }
    };




    return (
        <>
            <div className='hero-section-navbr'>
                <div className='ms-5'>
                    <img className='logoLogin' src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo.png" alt="" />
                </div>
                <div className='formBody'>
                    <div className='login card shadow p-1 d-flex justify-content-center'>
                        <Form className='m-4' onSubmit={handleJoinClick} >
                            <h2>Sign In</h2>
                            <p>Stay updated on your professional world</p>
                            <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlInput1">
                                <label className='labelEmail mb-1'>Email or phone</label>
                                <div>
                                    <input className='inputSign inputSignLogin' type="text" name="email" onChange={handleEmail} value={email} />
                                </div>
                            </Form.Group>
                            {emailError ? <span style={{ color: 'red' }}>Invalid Email</span> : ""}

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <label className='labelEmail mb-1'>Password</label>
                                <div>
                                    <input className='inputSign inputSignLogin' type="password" value={password} onChange={handlePassword} name="password" />
                                </div>
                            </Form.Group>
                            {passwordError ? <span style={{ color: 'red' }}>uppercase letter, one digit, and one special character</span> : ""}
                            <p className=' fw-bold' style={{ color: ' #0A66C2' }}>Forget Password</p>
                            <Button type='submit' className='agreeBtn'>Sign In</Button>
                            <Button onClick={handleGoogleLogin} className='googles'> <span ><img className='googleImg' src={google} alt="" /></span> <span className=''>Continue with Google</span> </Button>
                            <Divider><span className='or'>Or</span></Divider>
                            <h6 className='mt-3 d-flex justify-content-center'>New to LinkedIn? <span className='text-primary ms-1 signUpLink'> <a href="/create_account">  SignUp</a></span></h6>
                        </Form>
                    </div>
                    <Context.Provider value={contextValue}>
                        {contextHolder}
                    </Context.Provider>
                </div>

            </div>
        </>
    )
}

export default Index
