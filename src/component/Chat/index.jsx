import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './index.css'
import Form from 'react-bootstrap/Form';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Index() {
    const [massageUp, setMessageUp] = useState(false);
    const { profileImg } = useContext(UserContext);

    const MessageUpDwon = () => {
        setMessageUp(!massageUp);
        if (!massageUp) {
            getUserFriendRequests()
        }
    };
    function getUserFriendRequests() {
        axios
            .get(`http://localhost:3003/getUserAcceptRequestsList/${id}`)
            .then((res) => {
                console.log("AcceptsReq:", res.data)
                const updatedCart = res.data.filter((item) => item._id !== id);
                // setGetFriends(updatedCart);
            })
            .catch((err) => {
                console.log('API Error:', err);
            })
    }

    const TokenData = localStorage.getItem("Token")
    const decodedToken = jwt_decode(TokenData)
    const { firstname, lastname, profile, id } = decodedToken;

    return (
        <div>
            <div className='message'>
                <Card style={{ width: '19rem' }}>
                    <div className='d-flex'>
                        <div>
                            {/* <img className=' meassImg ms-2 mt-2' src={profileImg} alt="" /> */}
                            {profileImg ? (
                                <img className=' meassImg ms-2 mt-2' src={profileImg} alt="" />) : (
                                <img className=' meassImg ms-2 mt-2' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                            )}

                            <span className='online'></span>
                        </div>
                        <div className='mt-3 ms-2 fw-bold'>
                            Messaging
                        </div>
                        <div className='d-flex settings'>
                            <div>
                                <Button className='upButton mt-1' variant="light"><i class="fa-solid fa-ellipsis fs-6"></i></Button>
                            </div>
                            <div>
                                <Button className='upButton mt-1' variant="light"><i class="fa-solid fa-pen-to-square fs-6"></i></Button>
                            </div>
                            <div>
                                <Button className='upButton mt-1' onClick={MessageUpDwon} variant="light">{massageUp ? <i class="fs-6 fa-solid fa-chevron-down"></i> : <i class="fa-solid fa-chevron-up"></i>}</Button>
                            </div>
                        </div>
                    </div>

                    {massageUp && (<>

                        <div className='searchMassage'>
                            <div>
                                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Search" className='searchChat' />
                                </Form.Group>
                            </div>
                            <div className='focused'>
                                <Button variant='light'>Focused</Button>
                                <Button variant='light'>Other</Button>
                            </div>
                        </div>
                        <div className='chatList'>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        // src={profileImg} 
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>

                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            {/* <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex cardEsign'>
                                <div className='mt-1'>
                                    <img className='messageProfile'
                                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt="" />
                                </div>
                                <div className='ms-1 massageName'>
                                    <span>{firstname + " " + lastname}<span className='time'>May 12</span></span>
                                    <div className='msg'>
                                        <span >Hii,How dfdsfgdgfdare youdfgfdsadfgdsafg</span>
                                        <hr className='Hr' />
                                    </div>

                                </div>
                            </div> */}

                        </div>
                    </>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Index
