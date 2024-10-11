import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = process.env.REACT_APP_BASE_URL;

function CoverModel(props) {
  const [show, setShow] = useState(true);
  const { cover, profileS } = props;


  const [gettingBackendData, setGettingBackendData] = useState([])

  const handleClose = () => props.onClose(true)
  const handleDismiss = () => props.onClose(false)

  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, id } = decodedToken;

  // const requestBody = {
  //   base64: image,
  // };

  //   useEffect(() => {
  //     let a = localStorage.getItem("id")
  //     axios.get(`http://localhost:3003/signup/${a}`)
  //       .then((res) => {
  //         console.log(res.data)
  //         // setData(res.data.image)
  //         // setCap(res.data.caption)
  //         if (res.data.imageData) {
  //           setGettingBackendData(res.data.imageData)
  //         }

  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }, [])

  const getCurrentTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${day}, ${hours}:${minutes}`;

    return formattedTime;
  };



  // function upload() {
  //   const CoverImage ={
  //       cover: cover,
  //       time: getCurrentTime()
  //   }
  //   fetch(`http://localhost:3003/cover/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(CoverImage)
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  // }

  const [url, setUrl] = useState("");

  const uploadImage = () => {
    // const data = new FormData()
    // data.append("file", image)
    // data.append("upload_preset", "LinkedinDataStore")
    // data.append("cloud_name","dxfr1guyh")
    // fetch("  https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload",{
    // method:"post",
    // body: data
    // })
    // .then(resp => resp.json())
    // .then(data => {
    // setUrl(data.url)
    // console.log("Data.URL",data.url)
    // })
    // .catch(err => console.log(err))
  }


  // function upload() {
  //   const data = new FormData()
  // data.append("file", profileS)
  // data.append("upload_preset", "LinkedinDataStore")
  // data.append("cloud_name","dxfr1guyh")
  // fetch("  https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload",{
  // method:"post",
  // body: data
  // })
  // .then(resp => resp.json())
  // .then(data => {
  // setUrl(data.url)
  // console.log("Data.URL",data.url)
  // })
  // .catch(err => console.log(err))

  //   if (profileS !== null) {
  //     console.log("Profile Data Come")
  //     // console.log(id)

  //     const profileImage = {
  //       profile: url,
  //       time: getCurrentTime()
  //     };
  //     // Upload to profile image API
  //     fetch(`http://localhost:3003/post/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(profileImage)
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         window.location.reload();
  //         closeModel()
  //       })
  //       .catch((error) => {
  //         console.error('Error uploading profile image:', error);
  //       });
  //     console.log("Profile Uploaded Successfully")

  //   } else if (cover !== null) {
  //     console.log("Cover Data Come")
  //     const coverImage = {
  //       cover: cover,
  //       time: getCurrentTime()
  //     };

  //     // Upload to cover image API
  //     fetch(`http://localhost:3003/cover/${id}/cover`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(coverImage)
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         window.location.reload();
  //         closeModel()
  //       })
  //       .catch((error) => {
  //         console.error('Error uploading cover image:', error);
  //       });
  //   } else {
  //     console.error('Both profileS and cover images are null.');
  //   }
  // }


  function upload() {
    if (profileS !== null) {
      const data = new FormData();
      data.append("file", profileS);
      data.append("upload_preset", "LinkedinDataStore");
      data.append("cloud_name", "dxfr1guyh");

      fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
        method: "post",
        body: data
      })
        .then(resp => {
          if (!resp.ok) {
            throw new Error("Failed to upload profile image");
          }
          return resp.json();
        })
        .then(data => {
          setUrl(data.url);
          const profileImage = {
            profile: data.url,
            time: getCurrentTime()
          };
          return fetch(`${baseUrl}/userProfile/${id}/profile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profileImage)
          });
        })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to save profile image");
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          window.location.reload();
          closeModel();
        })
        .catch(error => {
          console.error('Error uploading profile image:', error.message);
          // Display error message to the user
        });
    } else if (cover !== null) {
      const data = new FormData();
      data.append("file", cover);
      data.append("upload_preset", "LinkedinDataStore");
      data.append("cloud_name", "dxfr1guyh");

      fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
        method: "post",
        body: data
      })
        .then(resp => {
          if (!resp.ok) {
            throw new Error("Failed to upload cover image");
          }
          return resp.json();
        })
        .then(data => {
          const coverImage = {
            cover: data.url,
            time: getCurrentTime()
          };
          return fetch(`${baseUrl}/cover/${id}/cover`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(coverImage)
          });
        })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to save cover image");
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          window.location.reload();
          closeModel();
        })
        .catch(error => {
          console.error('Error uploading cover image:', error.message);
          // Display error message to the user
        });
    } else {
      console.error('Both profileS and cover images are null.');
      // Display error message to the user
    }
  }


  const closeModel = () => {
    setShow(false)
  }

  return (
    <>
      <Box >
        <Modal show={show} onHide={handleDismiss} >
          <Modal.Header closeButton>
            <Modal.Title>Upload Cover Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div>
              {cover == "" || cover == null ? "" : <><img width={470} height={200} src={profileS ? profileS : cover} alt="" /> <div className='mt-4 d-flex justify-content-center'>
                <Button onClick={upload}>Upload</Button>
              </div></>}
            </div> */}

            <div>
              {profileS && (
                <>
                  <img width={470} height={200} src={profileS} alt="Profile Image" />
                  <div className='mt-4 d-flex justify-content-center'>
                    <Button onClick={upload}>Upload</Button>
                  </div>
                </>
              )}
              {cover && !profileS && (
                <>
                  <img width={470} height={200} src={cover} alt="Cover Image" />
                  <div className='mt-4 d-flex justify-content-center'>
                    <Button onClick={upload}>Upload</Button>
                  </div>
                </>
              )}
            </div>


          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal></Box>
    </>
  );
}

export default CoverModel;



