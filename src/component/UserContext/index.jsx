import React, { createContext, useEffect, useState } from 'react';
// import ProfileImgAvtar from '../Home/assets/LinkedIn_logo.png'
import axios from 'axios'
import jwt_decode from "jwt-decode";
// import { useNavigate } from 'react-router';

export const UserContext = createContext();
const baseUrl = process.env.REACT_APP_BASE_URL;

export const UserProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [linkedOneId, setLinkedOneId] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [welcome,setWelcome] = useState('');
  const [showAnotherCard, setShowAnotherCard] = useState(false);

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

  useEffect(() => {
    const TokenData = localStorage.getItem("Token");

    if (TokenData) {
      try {
        const decodedToken = jwt_decode(TokenData);
        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
          console.error("Token has expired");
          // Optionally navigate to login or handle expired token
        } else {
          setLinkedOneId(decodedToken.id);
          setFirstname(decodedToken.firstname || ''); 
          setLastname(decodedToken.lastname || '');   
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        // Optionally navigate to login or handle error
      }
    }
  }, []);

  useEffect(() => {
    if (linkedOneId) {
      axios.get(`${baseUrl}/signup/${linkedOneId}`)
        .then((res) => {
          setCoverImg(res?.data?.data.cover);
          setProfileImg(res?.data?.data.profile);
          setWelcome(res.data.data.welcomePost)
        })
        .catch((err) => {
          console.log('API Error:', err);
        });
    }
  }, [linkedOneId]);


return (
    <UserContext.Provider value={{
      coverImg, setCoverImg, profileImg,
      setProfileImg, firstname, lastname, setFirstname,
      setLastname, linkedOneId,
      setLinkedOneId,
      welcome,
      setShowAnotherCard,
      showAnotherCard
    }}>
      {children}
    </UserContext.Provider>
  );
};
