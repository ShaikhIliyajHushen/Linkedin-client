import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './index.css'
import cover from '../MyNetwork/Connect/cover.png'
import jwt_decode from "jwt-decode";
import { buttonBaseClasses } from '@mui/material';
import CoverModel from '../PostModel/CoverModel'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Divider } from 'antd';
import Button from 'react-bootstrap/Button';
import linkedinIm from '../Home/assets/LinkedIn_logo.png'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { apiFetch } from '../api/api_Endpoints';

const Index = () => {
    const fileInputRef = useRef(null);
    const [coverS, setCover] = useState("")
    const [profileS, setProfileS] = useState("")
    const [isCoverUpload, setIsCoverUpload] = useState(null)
    const [model, setModel] = useState(false)
    const [cart, setCart] = useState([])
    const { ids } = useParams(); // Get user ID from the URL
    const [profileData, setProfileData] = useState(null);
    console.log("userProfileID", ids)

    // useEffect(() => {
    //     // Fetch profile data from the server using the user ID
    //     axios
    //         .get(`http://localhost:3003/signup/${ids}`)
    //         .then((res) => {
            
    //             setProfileData(res.data);
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log('API Error:', err);
    //         });
    // }, [ids]);


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await apiFetch('GET_ONE_SIGNUP', { id: ids });
                setProfileData(res);
                console.log("GET_ONE_SIGNUP Profile", res);
            } catch (error) {
                console.log('API Error:', error);
            }
        };
        if (ids) {
            fetchProfileData();
        }
    }, [ids]);


    const { coverImg, profileImg, setProfileImg, setCoverImg } = useContext(UserContext);

    const TokenData = localStorage.getItem("Token")
    const decodedToken = jwt_decode(TokenData)
    const { firstname, lastname, id } = decodedToken;

    const CoverimageUpload = () => {
        setModel(!model)
    }


    function onVerifyClose(result) {
        if (!result) {
            setModel(false)
            return
        }
    }

    const handleCover = () => {
        // console.log("Uploaded Cover")
        setIsCoverUpload(true)
        fileInputRef.current.click();
    }
    const handelUploadPic = () => {
        // console.log("Uploaded Profile")
        setIsCoverUpload(false)
        fileInputRef.current.click();
    }

    const handleFileInputChange = (e) => {
        // console.log(e)
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            // console.log(reader.result);
            setCover(reader.result)
            setProfileS(reader.result)
        }
    }

    useEffect(() => {
        getCartData();
    }, [])


    const getCartData= async()=> {
        // axios
        //     .get(`http://localhost:3003/signup/${id}`)
        //     .then((res) => {
        const res = await apiFetch('GET_ONE_SIGNUP', { id })
        setCart(res.data)
        setCoverImg(res.data.cover)
        setProfileImg(res.data.profile)
        console.log(res.data)
        // })
        // .catch((err) => {
        //     console.log('API Error:', err);
        // })
    }



    return (
        <>
            <div className='container d-flex mainContainer'>
                <div className='profileContainer'>

                    {/* <div className='CoverPic'>
                        {coverImg ? (
                            <img
                                src={coverImg}
                                alt=""
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px'
                                }}
                            />
                        ) : (
                            <img
                                src={cover}
                                alt=""
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px'
                                }}
                            />
                        )}
                    </div> */}

                    <div className='CoverPic'>
                        {console.log("profileData", profileData)}
                        {profileData && profileData.cover ? (
                            <img
                                src={profileData.cover}
                                alt=""
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px'
                                }}
                            />
                        ) : (
                            <img
                                src={coverImg ? coverImg : cover}
                                alt=""
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px'
                                }}
                            />
                        )}
                    </div>



                    <div className='CoverPicUpload'>
                        <input type='file'
                            ref={fileInputRef}
                            onChange={handleFileInputChange}
                            onClick={CoverimageUpload}
                            style={{ display: 'none' }} />
                        <button style={{ border: 'none', borderRadius: '50%', width: '35px', height: '35px', backgroundColor: 'white' }} onClick={handleCover}>
                            <i class="fa-solid fa-camera"></i>
                        </button>
                    </div>

                    {/* <div className='ProfileRountPic' onClick={handelUploadPic}>
                        {profileImg ? (
                            <img src={profileImg} alt="" style={{ width: "153px", height: '153px', borderRadius: "50%" }} />
                        ) : (
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" style={{ width: "153px", height: '153px', borderRadius: "50%" }} />
                        )}
                    </div> */}
                    <div className='ProfileRountPic' >
                        {profileData && profileData.profile ? (
                            <img
                                src={profileData.profile}
                                alt=""
                                style={{ width: "153px", height: '153px', borderRadius: "50%" }}
                            />
                        ) : (
                            <img
                                src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                alt=""
                                onClick={handelUploadPic}
                                style={{ width: "153px", height: '153px', borderRadius: "50%" }}
                            />
                        )}
                    </div>


                    {/* <div className='mt-5 ms-4' >
                        <h3 className='mt-2'>{firstname + ' ' + lastname}</h3>
                        <p>Front-end Developer</p>
                        <p>Javascript||React||React Native||Angular||Redux||Nodejs||Expressjs||Full Stack Developer </p>
                    </div> */}
                    <div className='mt-5 ms-4' >
                        {profileData ? (
                            <>
                                <h3 className='mt-2'>{profileData.firstname + ' ' + profileData.lastname}</h3>
                                <p>{profileData.jobTitle}</p>
                                <p>{profileData.skills}</p>
                            </>
                        ) : (
                            <>
                                <h3 className='mt-2'>{firstname + ' ' + lastname}</h3>
                                <p>Front-end Developer</p>
                                <p>Javascript||React||React Native||Angular||Redux||Nodejs||Expressjs||Full Stack Developer </p>
                            </>
                        )}
                    </div>


                </div>
                <div className=' profileRight'>
                    <Card className='prodetails '>
                        <span className='proLang'>Profile Language <span className='eidtPen'> <i class="fa-solid fa-pen "></i></span></span>
                        <p>English</p>
                        <Divider className='divider_1' />
                        <span className='proLang'>Public profile & URL<span className='eidtPen_1'> <i class="fa-solid fa-pen "></i></span></span>
                        <p>www.linkedin.com/in/shaikh-iliyajhushen-5a3997236</p>
                    </Card>
                    <Card className='prodetails_1 mt-2'>
                        <div className='d-flex justify-content-center mt-3'>
                            <p className='textSize'>Get the latest jobs and industry news</p>
                        </div>
                        <div className='d-flex'>
                            <div >
                                {profileImg ? (
                                    <img className='rightRoundImg_1 me-4' src={profileImg} alt="" />
                                ) : (
                                    <img className='rightRoundImg_1 me-4' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                                )}
                            </div>
                            <div>
                                <img className='rightAdImage_1' src={linkedinIm} alt="" />
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <div className='rightFallow_1 '>
                                Shaikh, explore relevant opportunities <span className='d-flex justify-content-center'>with <span className='fw-bold ms-2'>Inovalon</span>  </span>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button className='fallowBtn_1 text-center'>Fallow</Button>
                            </div>
                        </div>
                    </Card>
                </div>
                {model ? <CoverModel onClose={onVerifyClose} cover={isCoverUpload ? coverS : null} profileS={isCoverUpload ? null : profileS} /> : ""}

            </div>

        </>
    )
}

export default Index
