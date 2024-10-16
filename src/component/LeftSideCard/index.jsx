import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Divider } from 'antd';
import './index.css'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import cover from '../Profile/cover.png'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

function Index() {
    const { profileImg, coverImg, firstname, lastname } = useContext(UserContext);

    // const TokenData = localStorage.getItem("Token")
    // const decodedToken = jwt_decode(TokenData)
    // const { firstname, lastname } = decodedToken;



    return (
        <>
            <Card className='leftcard' style={{ borderRadius: '10px' }}>
                {/* width: '18rem', height: '500px',  */}
                <div className='imgleft'>
                    {/* <img src={cover} alt="" className='imgleft' /> */}
                    {coverImg ? (
                        <img src={coverImg} alt="" className='imgleft' />) : (
                        <img src={cover} alt="" className='imgleft' />
                    )}
                </div>

                <div className='roundImgDiv'>
                    {profileImg ? (
                        <Link to={`profile`}> <img className='roundImg' src={profileImg} alt="" /></Link>) : (
                        <img className='roundImg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                    )}
                </div>
                <div className='mt-3 d-flex justify-content-center'>
                    <h5 className='mt-4' style={{ fontSize: 'medium' }}>
                        <Link to={`profile`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {firstname + " " + lastname}
                </Link>
                        </h5>
                </div>
                <div className='d-flex justify-content-center skills'>
                    <p >Developer||Javascript||React||React Native||Angular||Redux||Nodejs||Expressjs||Full Stack Develope</p>
                </div>

                <Divider className='divider' />
                <span className='ms-2 textSize'>Who's viewed your profil <span className='no ms-5 text-primary'>24</span></span>
                <span className='ms-2 textSize'>Impressions of your post <span className='no ms-5 text-primary'>118</span></span>
                <Divider className='divider' />

                <div>
                    {/* <p className='ms-2 textSize'>Grow your career as pre</p> */}
                    <span className='ms-2 textSize'><u>Access exclusive tools & insights</u></span>
                    <p className='ms-2 textSize'><i className="fa-solid fa-stop me-1 fs-7"></i><u >Try Premium for free</u></p>
                    <hr />
                </div>
                <p className='ms-2 textSize'>
                    <i class="fa-solid fa-bookmark fs-7"></i> My itmes
                </p>
            </Card>
            <div className='  mt-2 stickyLeftSide'>
                <Card className='leftcard' style={{ borderRadius: '10px' }}>
                    <h6 className='m-3' style={{ fontSize: 'medium' }}>Recent</h6>
                    <div>
                        <ul className='list textSize'>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Python Developer Community</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Javascript</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>UI-Developer</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>UI Designer and UI Developer</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Big Data,Data Science,Al</span></li>
                        </ul>
                        <h6 className='ms-3 text-primary' style={{ fontSize: 'small' }}>Groups</h6>
                        <div>
                            <ul className='list textSize'>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Python Developer Community</span></li>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Javascript</span></li>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>UI-Developer</span></li>
                            </ul>
                        </div>
                        <h6 className='ms-2 text-primary' style={{ fontSize: 'small' }}>Evnets<i className="mt-1 me-2 float-end fa-solid fa-plus text-dark fs-6"></i></h6>
                        <div>
                            <h6 className='ms-2 mt-4 text-primary' style={{ fontSize: 'small' }}>Folled Hashtag</h6>
                        </div>
                        <div>
                            <Divider className='divider' />
                            <span className='d-flex justify-content-center m-2 '> Discover More</span>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Index
