import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import './index.css'
import WhoCanSee from './WhoSee'
import { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { apiFetch } from '../api/api_Endpoints';
import { message } from 'antd';

function PostModel(props) {
  const [show, setShow] = useState(true);
  const [modelPost, setModelPost] = useState(false)
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("")
  const [text, setText] = useState();
  const [url, setUrl] = useState("");
  const [gettingBackendData, setGettingBackendData] = useState([])

  const {postModelHide} = props

  const handleClose = () => props.onClose(true)
  const handleDismiss = () => props.onClose(false)


  const { linkedOneId } = useContext(UserContext);
  // console.log("Token Id In Model:", linkedOneId)


  function onVerifyClose(result) {
    if (!result) {
      setModelPost(false)
      return
    }
  }

  const postModel = () => {
    setModelPost(!modelPost)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    console.log(e)
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result)
    }
  }

  const handleText = (e) => {
    let text = e.target.value;
    console.log(text)
    setText(text)
  }

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

  //Woeking code function Upload() {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "LinkedinDataStore");
  //   data.append("cloud_name", "dxfr1guyh");

  //   fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
  //     method: "post",
  //     body: data
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       const imageUrl = data.url;
  //       console.log("Data.URL", imageUrl);
  //       setUrl(imageUrl);

  //       let id = localStorage.getItem("id");

  //       const ImageData = [...gettingBackendData, {
  //         image: imageUrl, 
  //         caption: text,
  //         comments: [],
  //         time: getCurrentTime()
  //       }];

  //       return fetch(`http://localhost:3003/signup/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(ImageData)
  //       });
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  // }

  // const Upload = async () => {
  //   const data = new FormData();
  //   data.append('file', image);
  //   data.append('upload_preset', 'LinkedinDataStore');
  //   data.append('cloud_name', 'dxfr1guyh');

  //   try {
  //     // Upload to Cloudinary
  //     const cloudinaryData = await apiFetch('CLOUDINARY_UPLOAD', {}, 'POST', data, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //     const imageUrl = cloudinaryData.url;
  //     console.log('Cloudinary URL:', imageUrl);
  //     setUrl(imageUrl);

  //     // Perform the backend request
  //     const id = localStorage.getItem('id');
  //     console.log('PostModel Trigger');

  //     const ImageData = [...gettingBackendData, {
  //       image: imageUrl,
  //       caption: text,
  //       comments: [],
  //       time: getCurrentTime()
  //     }];

  //     await apiFetch('GET_ONE_SIGNUP', { id }, 'PUT', ImageData, {
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     console.log('PostModel Successful');
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };


  // function Upload() {
  //     const data = new FormData()
  //       data.append("file", image)
  //       data.append("upload_preset", "LinkedinDataStore")
  //       data.append("cloud_name","dxfr1guyh")
  //       fetch("  https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload",{
  //       method:"post",
  //       body: data
  //       })
  //       .then(resp => resp.json())
  //       .then(data => {
  //       setUrl(data.url)
  //       console.log("Data.URL",data.url)
  //       })
  //       .catch(err => console.log(err))
  //   let id = localStorage.getItem("id")
  //   const ImageData = [...gettingBackendData, {
  //     image: image,
  //     caption: text,
  //     comments: [],
  //     time: getCurrentTime()
  //   }]

  //   fetch(`http://localhost:3003/signup/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(ImageData
  //     )
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });

  //   // fetch(`http://localhost:3003/signup/${id}`, {
  //   //   method: "PUT",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({ base64: data, caption: cap }
  //   //     // base64: image{}
  //   //   )
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log(data);
  //   //     window.location.reload();
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error uploading image:', error);
  //   //   });
  // }

  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, profile } = decodedToken;

  const Upload = async () => {
    const id = localStorage.getItem('id');

    // if (!image && !text) {
    //   console.log('Either a caption or an image is required.');
    //   return;
    // }
    const data = new FormData();
    try {
      let imageUrl = null;

      if (image) {
        data.append('file', image);
        data.append('upload_preset', 'LinkedinDataStore');
        data.append('cloud_name', 'dxfr1guyh');

        const cloudinaryData = await apiFetch('CLOUDINARY_UPLOAD', {}, 'POST', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        imageUrl = cloudinaryData.url;
        console.log('Cloudinary URL:', imageUrl);
        setUrl(imageUrl);
      }

      if (!imageUrl && !text) {
        message.open({
          type: 'error',
          content: 'Either a caption or an image is required.',
          style: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
          },
        });
        console.log('Either a caption or an image is required.');
        return;
    }

      const newData = {
        ...(imageUrl && { image: imageUrl }),
        ...(text && { caption: text }),
        firstname:firstname,
        lastname:lastname,
        profile:profile,
        recipient:id,
        comments: [],
        time: getCurrentTime(),
      };

      const updatedData = [...gettingBackendData, newData];

      // Send the data to the backend
      await apiFetch('UPLOAD_POST', { id }, 'PUT', updatedData, {
        headers: { 'Content-Type': 'application/json' }
      });


      console.log('PostModel Successful');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image or posting data:', error);
    }
  };

  return (
    <>
      <Box >
        <Modal show={show} onHide={handleDismiss} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>{postModelHide?"Create a post" :"Upload Post" }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {postModelHide && (<>
            <div className='d-flex mt-1 ms-2 '>
              <div >
                <img className='messageProfile' src={profile} alt="" />
              </div>
              <div className='ms-2 massageName'>
                {firstname + " " + lastname}
                <div>
                  <Button size='small' onClick={postModel} variant="light" className='Anyone'>
                    <i className="mt-1 me-2 fa-solid fa-earth-americas"></i>
                    <div>Anyone <i class="fa-solid fa-caret-down"></i>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <input type="text" onChange={handleText} name='text' value={text} placeholder='write your post' className='border-input' />
            </div>
            </>)}
            <div className='mt-3'>
              {image == "" || image == null ? "" : <img width={470} height={300} src={image} alt="" />}
            </div>
            <div className='d-flex justify-content-between'>
              <div className='mt-3'>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <Button className='gallaryBtn' onClick={handleButtonClick} variant="light" >
                  <i class="fa-solid fa-image"></i></Button>
              </div>
              <div>
                <Button onClick={Upload} className='mt-3' variant='light'>Post</Button>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal></Box>
      {modelPost ? <WhoCanSee onClose={onVerifyClose} /> : ""}
    </>
  );
}

export default PostModel;