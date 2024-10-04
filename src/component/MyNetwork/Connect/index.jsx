import { useEffect, useState } from 'react'
import './index.css'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import profile from './profile.png';
import cover from './cover.png';
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Loader from '../../Loader';
import { API_ENDPOINTS, apiFetch } from '../../api/api_Endpoints';

const Index = () => {

  const [cart, setCart] = useState([]);
  const [getFriends, setGetFriends] = useState([]);
  const [friend, setFriend] = useState([]);
  const [loading, setLoading] = useState(true);
  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, profile, id } = decodedToken;

  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
    console.log("notifications", notifications)
  };

  // useEffect(() => {
  //   // getCartData();
  //   // getUserFriendRequests()
  // }, [])



  const getSuggestedFriendList = async () => {
    try {
      const res = await apiFetch('GET_SUGGESTED_FRIENDS', { id }, 'GET');
      setFriend(res.data)
      setLoading(false)
      console.log("getSuggestedFriendList", res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getUserFriendRequests = async () => {
    try {
      const res = await apiFetch('GET_FRIEND_REQUEST', { id }, 'GET');
      setGetFriends(res.user.friendRequests)
      // console.log("res.data", res.user.friendRequests)
    }
    catch (err) {
      console.log(err)
    }
  }

  // function getCartData() {
  //   axios
  //     .get('http://localhost:3003/getSuggestedFriends')
  //     .then((res) => {
  //       const suggestedFriends = res.data.data.filter((item) => item._id !== id);

  //       // Filter out users who are already in the friend requests
  //       const filteredSuggestedFriends = suggestedFriends.filter(
  //         (item) => !getFriends.some((friendRequest) => friendRequest.UserLoginId === item._id)
  //       );

  //       setFriend(filteredSuggestedFriends);
  //       setCart(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log('API Error:', err);
  //     });
  // }


  useEffect(() => {
    getUserFriendRequests();
    getSuggestedFriendList()
  }, []);




  const getCurrentTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${day}, ${hours}:${minutes}`;
    return formattedTime;
  };


  // const handleConnect = (id) => {
  //   console.log('Connecting ----: ' + id);
  //   console.log(firstname + ' ' + lastname);

  //   const requestDetails = {
  //     profile: profile,
  //     name: firstname + ' ' + lastname, // Add a space between the names
  //     time: getCurrentTime(),
  //     UserLoginId: id,
  //   };

  //   fetch(`http://localhost:3003/post/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestDetails),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Network response was not ok: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log(res);

  //     })
  //     .catch((error) => {
  //       console.error('Network request failed:', error);
  //       // Handle the error, e.g., show an error message to the user
  //     });
  // };

  const [connect, setConnect] = useState({})

  const handleConnect = async (items, index) => {
    console.log('requestConnectorId: ' + items._id.toString());
    const requestDetails = {
      senderId: id,
      receiverId: items._id.toString(),
    };
    try {
      const res = await apiFetch('SEND_FRIEND_REQUEST', {}, 'POST', requestDetails);
      getSuggestedFriendList()
      // console.log("connect", res.newRequest.status);
      // setConnect(res.newRequest);
      setConnect(prevState => ({
        ...prevState,
        [items._id]: res.newRequest.status
      }));
    }
    catch (err) {
      console.log(err)
    }

    // fetch(`http://localhost:3003/post/${id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestDetails),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`Network response was not ok: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // Update requestStatus in friend array
    //     const updatedFriend = [...friend];
    //     updatedFriend[index].requestStatus = 'Pending';
    //     setFriend(updatedFriend);
    //     // setFriend(res)
    //   })
    //   .catch((error) => {
    //     console.error('Network request failed:', error);
    //     // Handle the error, e.g., show an error message to the user
    //   });
  };


  // const acceptFriendRequest = (itm) => {
  //   fetch(`http://localhost:3003/acceptFriendRequest/${id}`, { // Assuming item.id is the endpoint ID
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       profile: itm.profile,
  //       name: itm.name,
  //       time: itm.time,
  //       UserLoginId: itm.UserLoginId,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.message === "Friend request accepted") {
  //         console.log("Friend request accepted!");
  //       } else {
  //         console.log("Friend request not accepted:", data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('API request failed:', error);
  //     });
  //   const updatedCart = cart.filter((items) => items._id !== itm.UserLoginId);
  //   setCart(updatedCart);

  // };


  const acceptFriendRequest = async (itm) => {
    console.log("itm", itm)
    const acceptorIds = {
      userId: id,
      sender: itm.sender._id
    };
    // console.log("acceptorIds:", acceptorIds);
    try {
      const res = await apiFetch('ACCEPT_REQUEST', {}, 'POST', acceptorIds);
      // console.log("res.data", res.message)
      getUserFriendRequests();
    }
    catch (err) {
      console.log(err)
    }
  };



  const rejectFriendRequest = async (itm) => {
    const rejectId = {
      userId: id,
      sender: itm.sender._id
    };
    console.log("rejectId:", rejectId);
    try {
      const res = await apiFetch('REJECT_REQUEST', {}, 'DELETE', rejectId);
      console.log("res.data", res.message)
      getUserFriendRequests();
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <>
      <div style={{ width: '100%', padding: '5px' }}>
        <div>
          <Card style={{ width: '100%', padding: '5px' }}>
            <div>
              {getFriends?.length > 0 ? "Invitations" : "  No pending invitations"}
            </div>
            {getFriends?.map((itm) => (
              <div key={itm}>

                <div className='friendRequestContainer mt-1'>
                  <div className='friendRequest'>
                    <div>
                      <img
                        // src={itm.profile} 
                        src={itm.sender.profile ? itm.sender.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="" />
                    </div>
                    <div className='ms-2 mt-2'>
                      <h6>{itm.sender.firstname} {itm.sender.lastname}</h6>
                      <span>{itm.createdAt}</span>
                    </div>
                  </div>
                  <div className='deleteBtn'>
                    <div>
                      <button className='rejectBtn' onClick={() => { rejectFriendRequest(itm) }}> Ignore </button>
                    </div>
                    <div>
                      <button className='acceptbtn' onClick={() => { acceptFriendRequest(itm) }}>Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }
          </Card>
        </div>
        <div>

          <div className='card' style={{ width: '100%', marginTop: '5px', padding: '15px' }}>
            <h6>People you may know in Greater Hyderabad Area</h6>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', margin: '15px' }}>
              {loading ? (
                <Loader />
              ) : (
                friend?.map((items, index) => (
                  <div key={index} className='card cardShadow' style={{ width: '180px', borderRadius: '15px', height: '290px', margin: '5px', position: 'relative' }}>
                    <button className="deleteSuggestedFriend">
                      <i className="fa-solid fa-xmark" style={{ color: 'white' }}></i>
                    </button>
                    <div style={{ width: '100%', height: '70px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundImage: `url(${items.cover ? items.cover : cover})`, position: 'relative' }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '35px', width: '60%', height: '100px', borderRadius: '50%', borderWidth: '1px solid black' }}>
                      <img style={{ width: '100%', height: '100px', borderRadius: '50%' }}
                        // src={items.profile} 
                        src={items?.profile ? items?.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt="" />
                    </div>
                    <div className='text-center' style={{ marginTop: '38px', padding: '10px', width: '100%' }}>
                      <h6 className="text-ellipsis">{items.firstname + " " + items.lastname}</h6>
                      <p style={{ width: '100%', height: '43px', overflow: 'hidden' }}>FrontEnd React Developer</p>
                      <p style={{ width: '100%', height: '20px', overflow: 'hidden' }}><i className="fa-solid fa-link"></i><span className='ms-1'>mutual connection</span></p>
                      {connect[items._id] === 'Accepted' ? (
                        <span>Request Accepted</span>
                      ) : connect[items._id] === 'Rejected' ? (
                        <span>Request Rejected</span>
                      ) : connect[items._id] === 'Pending' ? (
                        <span>Connecting...</span>
                      ) : (
                        <button key={items._id}
                          disabled={connect[items._id] === 'Pending'}
                          onClick={() => handleConnect(items, index)} className='Connect-btn'>
                          {connect[items._id] ? connect[items._id] : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Index










{/* <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', margin: '15px' }}>
              {loading ? <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div> : ''}
              {friend.map((items, index) => (
                <div key={index} className='card cardShadow' style={{ width: '180px', borderRadius: '15px', height: '290px', margin: '5px', position: 'relative' }}>

                  <button className="deleteSuggestedFriend">
                    <i className="fa-solid fa-xmark" style={{ color: 'white' }}></i>
                  </button>

                  <div style={{ width: '100%', height: '70px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundImage: `url(${items.cover ? items.cover : cover})`, position: 'relative' }}></div>
                  <div style={{ position: 'absolute', top: '15px', left: '35px', width: '60%', height: '100px', borderRadius: '50%', borderWidth: '1px solide black' }}>
                    <img style={{ width: '100%', height: '100px', borderRadius: '50%' }} src={items.profile} alt="" />
                  </div>
                  <div className='text-center' style={{ marginTop: '38px', padding: '10px', width: '100%', }}>
                    <h6 className="text-ellipsis">{items.firstname + " " + items.lastname}</h6>
                    <p style={{ width: '100%', height: '43px', overflow: 'hidden' }}>FrontEnd React Developer</p>
                    <p style={{ width: '100%', height: '20px', overflow: 'hidden' }}><i class="fa-solid fa-link "></i><span className='ms-1'>mutual connection</span></p>
                    {items.requestStatus === 'Accepted' ? (
                      <span>Request Accepted</span>
                    ) : items.requestStatus === 'Rejected' ? (
                      <span>Request Rejected</span>
                    ) : items.requestStatus === 'Pending' ? (
                      <span>Connecting...</span>
                    ) : (
                      <button disabled={items.requestStatus === "Pending"} onClick={() => handleConnect(items._id, index)} className='Connect-btn'>
                        {items.requestStatus === "Pending" ? "Pending" : 'Connect'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div> */}