import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './index.css'
import jwt_decode from "jwt-decode";
import linkedinIm from '../Home/assets/LinkedIn_logo.png'
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Index() {

    const TokenData = localStorage.getItem("Token")
    const decodedToken = jwt_decode(TokenData)
    // const {profile} = decodedToken;
    const { profileImg } = useContext(UserContext);

    return (
        <>
            <div>
                <Card className='rightCard' style={{ width: '19rem', borderRadius: '10px' }}>

                    <h4 className='m-3' style={{ fontSize: '17px' }}>LinkedIn News<i className="mt-2 fs-6 fa-solid fa-circle-info float-end"></i> </h4>
                    <div>
                        <ul className='fw-bold' style={{ fontSize: '12px' }}>
                            <li>Fastest-growing industry for freshers  <p>1d ago 2,346 readers</p></li>
                            <li>Indians love working from office <p>1d ago 4,346 readers</p></li>
                            <li>Tata Technologies to hire 1,000 woman <p>1d ago 25,346 readers</p></li>
                            <li>India's Q4 GDP surges <p>1d ago 346 readers</p></li>
                            <li>The futur of hiring for SMBs <p>3d ago 2,946 readers</p></li>
                        </ul>
                    </div>

                </Card>
            </div>
            <div className='mt-2 stickyRightCard'>
                <Card className='rightCard mb-5' style={{ width: '19rem', borderRadius: '10px' }}>
                    <div className='d-flex justify-content-center mt-3'>
                        <p className='textSize'>Get the latest jobs and industry news</p>
                    </div>
                    <div className='d-flex'>
                        <div >
                            {/* <img className='rightRoundImg me-4' src={profileImg} alt="" /> */}
                            {profileImg ? (
                                <img className='rightRoundImg me-4' src={profileImg} alt="" />) : (
                                <img className='rightRoundImg me-4' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                            )}
                        </div>
                        <div>
                            <img className='rightAdImage' src={linkedinIm} alt="" />
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <div className='rightFallow'>
                            Shaikh, explore relevant opportunities <span className='d-flex justify-content-center'>with <span className='fw-bold ms-2'>Inovalon</span>  </span>
                        </div>
                        <div className='mt-4 mb-3 d-flex justify-content-center'>
                            <Button className='fallowBtn'>Fallow</Button>
                        </div>
                    </div>

                </Card>
                <div className='footerData w-100%  p-3'>
                    <div className='ms-5 d-flex justify-content-center justify-content-around' >
                        <p>About</p>
                        <p>Accessibility</p>
                        <p>  Help Center</p>
                    </div>
                    <div className='ms-5 d-flex justify-content-center justify-content-around'>
                        <p>Privace & Terms</p>
                        <p>Ad Choices</p>
                    </div>
                    <div className='ms-5 d-flex justify-content-center justify-content-around'>
                        <p>Advertising Business Services</p>
                    </div>
                    <div className='ms-5 d-flex justify-content-center justify-content-around'>
                        <p>Get the LinkedIn app</p>
                        <p>More</p>
                    </div>
                    <div className='ms-5 d-flex justify-content-center'>
                        <img className='linkedInCopy' src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo.png" alt="" /><span className='mt-1'>Corporation @ 2023</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
