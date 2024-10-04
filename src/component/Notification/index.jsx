import { useEffect, useState } from 'react'
import './index.css'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Loader from '../Loader'
import { Diversity1 } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import linkedinIm from '../Home/assets/LinkedIn_logo.png'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { apiFetch } from '../api/api_Endpoints';

function Index() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true)
  // console.log("notifications", notifications)

  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { id } = decodedToken;

  const { profileImg } = useContext(UserContext);

  useEffect(() => {
    getNotification()
  }, [])


  const getNotification = async () => {
    try {
      const res = await apiFetch('GET_NOTIFICATION', { id }, 'GET');
      // console.log("res.data", res.notifications)
      setNotifications(res.notifications.reverse());
      setLoading(false)
    }
    catch (err) {
      console.log('API Error:', err);
    }
  }

  function formatTime(timestamp) {
    const commentTime = moment(timestamp, 'dddd, HH:mm');
    const now = moment();

    const diffInMinutes = now.diff(commentTime, 'minutes');
    const diffInHours = now.diff(commentTime, 'hours');
    const diffInDays = now.diff(commentTime, 'days');

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return commentTime.format('MMM DD');
    }
  }



  return (
    <div className='notify container '>
      {loading ? <Loader /> : (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '37px' }}>
          <div>
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
          <div className='col-sm-6 col-md-8 col-lg-6'>
            <Card className='mb' style={{ width: '38rem', borderRadius: '12px', backgroundColor: '#D7E9FB' }}>
              {notifications?.map((itm) => (
                <div key={itm}>
                  <div className='notificationContainer'>
                    <div className='notifying'>
                      <div>
                        <img src={itm.actor.profile} style={{ borderRadius: '50%', width: '50px', height: '50px' }} alt="" />
                      </div>
                      <div className='ms-2 mt-2' >
                        <h6 >{itm.actor.firstname}{itm.actor.lastname}</h6>
                        <h6 style={{ fontSize: '10px' }}>{itm.message}</h6>
                        {/* <h6 style={{ fontSize: '10px' }}>{formatTime(itm.createdAt)}</h6> */}
                        <h6 style={{ fontSize: '10px' }}>{itm.createdAt}</h6>
                        {/* <h6 style={{ fontSize: '10px' }}>{formatTime(new Date(itm.time))}</h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
              }
            </Card>
          </div>
          <div>
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
        </div> </>)}
    </div>
  )
}

export default Index
