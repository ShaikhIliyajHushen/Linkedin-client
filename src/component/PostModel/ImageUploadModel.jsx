import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';
import { apiFetch } from '../api/api_Endpoints';

function ImageUploadModel(props) {
  const [show, setShow] = useState(true);
  const { image } = props;
  // const {sharePostDetails} = props
  // const {userDetails,commentDetails} = sharePostDetails
  // const {itm} = props;
  // console.log("Model userDetails", userDetails)
  // console.log("Model commentDetails", commentDetails)

  const [gettingBackendData, setGettingBackendData] = useState([])

  const handleClose = () => props.onClose(true)
  const handleDismiss = () => props.onClose(false)

  useEffect(() => {
    let a = localStorage.getItem("id")
    axios.get(`http://localhost:3003/signup/${a}`)
      .then((res) => {
        // console.log(res.data)
        // setData(res.data.image)
        // setCap(res.data.caption)
        if (res.data.imageData) {
          setGettingBackendData(res.data.imageData)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const getCurrentTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${day}, ${hours}:${minutes}`;

    return formattedTime;
  };

  // const [mage, setImage ] = useState("");
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

  const TokenData = localStorage.getItem("Token")
  console.log(TokenData)
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, profile, id } = decodedToken;
  let fullName = firstname + " " + lastname
    console.log("fullName:", fullName,"profile:", profile);
 


  //wORKING function upload() {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "LinkedinDataStore");
  //   data.append("cloud_name", "dxfr1guyh");

  //   fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
  //     method: "post",
  //     body: data
  //   })
  //   .then(resp => resp.json())
  //   .then(cloudinaryData => {
  //     const imageUrl = cloudinaryData.url;
  //     console.log("Cloudinary URL:", imageUrl);
  //     setUrl(imageUrl);
  //     // Perform the backend request inside this block
  //     let id = localStorage.getItem("id");
  //     console.log("PostModel Trigger");

  //     const ImageData = [...gettingBackendData, {
  //       image: imageUrl, // Cloudinary URL 
  //       comments: [],
  //       time: getCurrentTime()
  //     }];

  //     fetch(`http://localhost:3003/signup/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(ImageData)
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Handle successful backend response
  //       console.log("PostModel Successful:", data);
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       // Handle backend request error
  //       console.error('Error uploading image:', error);
  //     });
  //   })
  //   .catch(err => {
  //     // Handle Cloudinary upload error
  //     console.error('Error uploading image to Cloudinary:', err);
  //   });
  // }
  const upload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'LinkedinDataStore');
    data.append('cloud_name', 'dxfr1guyh');

    try {
      // Upload to Cloudinary
      const cloudinaryData = await apiFetch('CLOUDINARY_UPLOAD', {}, 'POST', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = cloudinaryData.url;
      console.log('Cloudinary URL:', imageUrl);
      setUrl(imageUrl);

      // Perform the backend request
      const id = localStorage.getItem('id');
      console.log('PostModel Trigger');

      const ImageData = [...gettingBackendData, {
        firstname: firstname,
        lastname: lastname,
        profile: profile,
        image: imageUrl, // Cloudinary URL 
        comments: [],
        time: getCurrentTime()
      }];

      await apiFetch('UPLOAD_POST', { id }, 'PUT', ImageData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('PostModel Successful');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };



  // function upload() {
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
  //   let id = localStorage.getItem("id")
  //   console.log("PostModel Trigger")

  //   const ImageData = [...gettingBackendData, {
  //     image: url,// CloudNiry URL 
  //     comments: [],
  //     time: getCurrentTime()
  //   }]

  //   fetch(`http://localhost:3003/signup/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(ImageData)
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       window.location.reload();
  //       console.log("PostModel SuccessFull")
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  // }




  return (
    <>
      <Box >
        <Modal show={show} onHide={handleDismiss} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {image == "" || image == null ? "" : <><img width={470} height={300} src={image} alt="" /> <div className='mt-4 d-flex justify-content-center'>
                <Button onClick={upload}>Upload</Button>
              </div></>}
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal></Box>
    </>
  );
}

export default ImageUploadModel;



