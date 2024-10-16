import { useEffect, useState } from 'react';
import './index.css'
import Card from 'react-bootstrap/Card';
import gallery from './assets/gallery.png'
import youtube from './assets/youtube.png'
import calender from './assets/calendar.png'
import Feed from './assets/layout.png'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Model from '../PostModel/PostModel'
// import ImageUpload from '../PostModel/ImageUploadModel'
import React from 'react';
import { Divider } from 'antd';
import Message from '../Chat'
import CardData from '../PostDataApi'
import RightSidecard from '../RightSideCard'
import LeftSideCard from '../LeftSideCard'
import { useRef } from 'react';
import VideoUploadModel from '../PostModel/VideoUpload'
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Index() {
    const [modelPost, setModelPost] = useState(false)
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(false)
    const [imageUrl, setImageUrl] = useState(false);
    const [videoUrl, setVideoUrl] = useState(false);

    const { profileImg } = useContext(UserContext);


    // const TokenData = localStorage.getItem("Token")
    // const decodedToken = jwt_decode(TokenData)
    // const { profile } = decodedToken;


    const postModel = () => {
        // setModelPost(!modelPost)
        setImageUrl(!imageUrl)
        setImage(true)
    }

    const imageUpload = () => {
        setImageUrl(!imageUrl)
    }

    const handlevideo = () => {
        setVideoUrl(!videoUrl)
    }

    function onVerifyClose(result) {
        if (!result) {
            setModelPost(false)
            setImageUrl(false)
            setVideoUrl(false)
            return
        }
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

    // const handleFileInputChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //       const base64String = reader.result.split(',')[1];
    //       setImage(base64String);
    //     };

    //     reader.readAsDataURL(file);
    //   };


    return (
        <div className='hero-section container'>
            <div className=' headSpace'>
                <div className='container ' style={{display:'flex',justifyContent:'space-between',padding: '75px 75px 0 75px'}}>
                    <div className='leftSideCardDetails'>
                        <LeftSideCard />
                    </div>

                    <div >
                        <Card className='galleryCard' style={{ width: '35rem', height: '125px', borderRadius: '12px' }}>
                            <div className='d-flex m-2'>
                                <div >
                                    {profileImg ? (
                                        <img className='profileImg' src={profileImg} alt="" />) : (
                                        <img className='profileImg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                                    )}
                                </div>
                                <div>
                                    <input onClick={postModel} className='input' placeholder='Start post' type="text" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-around '>
                                <ButtonGroup aria-label="Basic example">
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            // type="file"
                                            style={{ display: 'none' }}
                                            onClick={imageUpload}
                                            onChange={handleFileInputChange}
                                        />
                                        <Button className='gallaryBtn' onClick={handleButtonClick} variant="light" >
                                            <img className='gallery' src={gallery} alt="" />Photo</Button>
                                    </div>
                                    <div >
                                        <Button className='gallaryBtn' variant="light" onClick={handlevideo} >
                                            <img className='gallery' src={youtube} alt="" />Video</Button>
                                    </div>
                                    <div >
                                        <Button className='gallaryBtn' variant="light">
                                            <img className='gallery' src={calender} alt="" />Event</Button>
                                    </div>
                                    <div >
                                        <Button className='gallaryBtn' variant="light">
                                            <img className='gallery' src={Feed} alt="" />Write Article</Button>
                                    </div>
                                </ButtonGroup>
                            </div>
                        </Card>
                        <Divider className='divider' orientation="right">Sort by</Divider>
                        <CardData />
                    </div>

                    <div className='rightSideCardDetails'>
                        <RightSidecard />
                        <Message />
                    </div>
                </div>
                {imageUrl ? <Model onClose={onVerifyClose} postModelHide={image}/> : ""}
                {/* {imageUrl ? <ImageUpload onClose={onVerifyClose} image={image} /> : ""} */}
                {videoUrl ? <VideoUploadModel onClose={onVerifyClose} /> : ""}
            </div>
        </div>
    )
}

export default Index
