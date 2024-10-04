import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useEffect } from 'react';
import './index.css'
import Card from 'react-bootstrap/Card';
import { apiFetch } from '../api/api_Endpoints';

function RePostModel(props) {
  const [show, setShow] = useState(true);
  const { sharePostDetails } = props
  const { userDetails, commentDetails } = sharePostDetails
  const [text, setText] = useState();

  const [gettingBackendData, setGettingBackendData] = useState([])

  const handleClose = () => props.onClose(true)
  const handleDismiss = () => props.onClose(false)

  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, profile, id } = decodedToken;

  const getCurrentTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${day}, ${hours}:${minutes}`;

    return formattedTime;
  };


  const Upload = async () => {

    const sharePostData = {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      profile: userDetails.profile,
      caption: text,
      time: getCurrentTime(),
      comments: [],
      firstnamePost: commentDetails.firstname,
      lastnamePost: commentDetails.lastname,
      profilePost: commentDetails.profile,
      userSharePostId: commentDetails._id,
      image: commentDetails.image,
      postCaption: commentDetails.caption,
      time: commentDetails.image ? commentDetails.time : commentDetails.caption ? commentDetails.time : null
      // commentDetails: commentDetails.image || commentDetails.caption && commentDetails.time // Include commentDetails in sharePostData
    };
    try {
      const response = await apiFetch(
        'REPOST_DATA',   // endpointKey
        { id },          // params
        'POST',          // method
        sharePostData    // requestBody
      );
      // console.log("Shared_data", response);
      window.location.reload();
    } catch (error) {
      console.error('Error sharing post:', error);
    }

    // fetch(`http://localhost:3003/rePostData/${id}/sharePost`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(sharePostData),
    // }).then((data) => {
    //   console.log("Shared_data", data);
    //   window.location.reload();
    // })
    //   .then((res) => {
    //       if (!res.ok) {
    //           throw new Error(`Network response was not ok: ${res.status}`);
    //       }
    //       return res.json();
    //   })
    //   .catch((error) => {
    //     console.error('Network request failed:', error);
    //   });
    // console.log("Trigerred")
  }

  const handleText = (e) => {
    let text = e.target.value;
    console.log(text)
    setText(text)
  }

  return (
    <>
      <Box >
        <Modal show={show} onHide={handleDismiss} style={{}} dialogClassName="custom-modal">
          {/* <Modal.Header closeButton>
            <Modal.Title>Share Post</Modal.Title>
          </Modal.Header> */}
          <Modal.Body >

            <div className='d-flex justify-content-between'>
              <div className='profileName d-flex'>
                <div>
                  <img className='profileImg01 mt-2 me-2 ms-3' src={profile} alt="" />
                </div>
                <div className='userName mt-2'>
                  {firstname + " " + lastname}<span className='ms-1'>(He/Him)</span>
                  <p>Full stack Developer <br /> {getCurrentTime()} <span><i class="fa-solid fa-earth-americas fs-6"></i></span></p>
                </div>
              </div>
              <div>
                <div onClick={handleDismiss} className='btn-close'>
                  {/* <i className="fa-solid fa-times"></i> */}
                </div>
              </div>
            </div>
            <div className='cardBody'>
              <div className='mb-3'>
                <input type="text" onChange={handleText} name='text' value={text} placeholder='Start writing or use @ to mention people, companies or schools' className='border-input' />
              </div>
              <Card>
                <div className='profileName d-flex'>
                  <div>
                    <img className='profileImg mt-3 me-2 ms-3' src={userDetails.profile} alt="" />
                  </div>
                  <div className='userName mt-3'>
                    {userDetails.firstname + " " + userDetails.lastname}<span className='ms-1'>(He/Him)</span>
                    <p>Full stack Developer <br /> {commentDetails.time} <span><i class="fa-solid fa-earth-americas fs-6"></i></span></p>
                  </div>
                </div>
                <div >
                  {commentDetails.caption !== "" && (
                    <div className='m-2 m-2'>
                      {commentDetails.caption}
                    </div>
                  )}
                </div>
                <div>
                  {commentDetails.image ? (
                    <img
                      className='postImg'
                      // width={470} height={300}
                      src={commentDetails.image}
                      alt='Post Image'
                      key={commentDetails.image}
                    />
                  ) : commentDetails.video ? (
                    commentDetails.video.includes('youtube.com') || commentDetails.video.includes('youtu.be') ? (
                      <iframe
                        className='postVideo'
                        width='560'
                        height='315'
                        src={commentDetails.video}
                        title='YouTube Video'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        key={commentDetails.video}
                      ></iframe>
                    ) : (
                      <video className='postVideo' controls key={commentDetails.video}>
                        <source src={commentDetails.video} type='video/mp4' />
                        Your browser does not support the video tag.
                      </video>
                    )
                  ) : null}
                </div>
              </Card>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button onClick={Upload}>Post</Button>

          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default RePostModel;



