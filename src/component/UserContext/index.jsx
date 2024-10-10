import React, { createContext, useEffect, useState } from 'react';
// import ProfileImgAvtar from '../Home/assets/LinkedIn_logo.png'
import axios from 'axios'
import jwt_decode from "jwt-decode";
// import { useNavigate } from 'react-router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [linkedOneId, setLinkedOneId] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [welcome,setWelcome] = useState('');
  // const [id setId]= useState();

  // const TokenData = localStorage.getItem("Token")
  //   const decodedToken = jwt_decode(TokenData)
  //   const { id } = decodedToken;    

  //   useEffect(() => {
  //     axios.get(`http://localhost:3003/signup/${id}`)
  //         .then((res) => {
  //             setCoverImg(res?.data?.data.cover);
  //             setProfileImg(res?.data?.data.profile); 
  //             // console.log("Profile image:", res?.data?.data.profile);
  //             // console.log("API Data:", res?.data.data);
  //         })
  //         .catch((err) => {
  //             console.log('API Error:', err);
  //         });
  // }, [id]);

  const TokenData = localStorage.getItem("Token");
  // console.log("Token Data:", TokenData);

  let id;
  try {
    const decodedToken = jwt_decode(TokenData);
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      console.error("Token has expired");
      // navigate('/');
    } else {
      id = decodedToken.id;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    // navigate('/');
  }

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3003/signup/${id}`)
        .then((res) => {
          setCoverImg(res?.data?.data.cover);
          setProfileImg(res?.data?.data.profile);
          setWelcome(res.data.data.welcomePost)
        })
        .catch((err) => {
          console.log('API Error:', err);
        });
    }
  }, [id]);



return (
    <UserContext.Provider value={{
      coverImg, setCoverImg, profileImg,
      setProfileImg, firstname, lastname, setFirstname,
      setLastname, linkedOneId,
      setLinkedOneId,
      welcome
    }}>
      {children}
    </UserContext.Provider>
  );
};
