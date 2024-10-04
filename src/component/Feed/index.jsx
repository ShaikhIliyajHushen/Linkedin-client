import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './index.css'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import linkedinIm from '../Home/assets/LinkedIn_logo.png'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';

function BasicExample() {
  const Navigate = useNavigate();
  const [friendRequestCount, setFriendRequestCount] = useState(2);
  const [notificationCount, setNotificationCount] = useState(4);

  const TokenData = localStorage.getItem("Token")
  const decodedToken = jwt_decode(TokenData)
  const { firstname, lastname, profile,id } = decodedToken;
  const { profileImg } = useContext(UserContext);


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '90%',
    transition: 'width 0.2s ease', // Add transition property
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '190px', // Initial width, adjust as needed
    },
    '&:focus-within': {
      width: '200px', // Width when focused, adjust as needed
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        height: '2ch',
        width: '29ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  }));

  const logout = () => {
    localStorage.clear();
    Navigate("/")
  }

 
  // useEffect(() => {
  //   getUserNotifications();
  // }, []);

  // const getUserNotifications = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3003/getCounts/${id}/notify`);
  //     setFriendRequestCount(res.data.friendRequestCount);
  //     setNotificationCount(res.data.notificationCount);
  //   } catch (err) {
  //     console.log('API Error:', err);
  //   }
  // };



  return (<>
    <div className='hero-section '>
      <Navbar className='navbar  ' bg='white' expand="lg">
        <div className='container' >
          <div className='logo'>
            <img src={linkedinIm} alt="" />
          </div>
          {/* <div className="mobile-only">
            <Nav.Link className='' as={NavLink} to='/Feed'>
              <div className='text-center '>
                <div >
                  <i className="fa-solid fa-house-chimney fs-3"></i>
                </div>
                <div className='home '>
                  Home
                </div>
              </div>
            </Nav.Link>
          </div> */}
          <div>
            <Search className=' border-secondary bg-light'>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                className='fs-6 Search'
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>
          {/* <div className='logout mobile-only'>
            <Button onClick={logout} variant='light'>LogOut</Button>
          </div> */}

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav ">
              <div className='d-flex IconsSpace'>
                <div className='me-2'>
                  <Nav.Link className='' as={NavLink} to='/Feed'>
                    <div className='text-center desktop-only'>
                      <div >
                        <i className="fa-solid fa-house-chimney fs-5"></i>
                      </div>
                      <div className='home '>
                        Home
                      </div>
                    </div>
                  </Nav.Link>
                </div>

                <div className='me-2'>
                  <Nav.Link as={NavLink} to='network'>
                    <div className='text-center desktop-only'>
                      <div style={{ position: 'relative' }}>
                        <i className="fa-sharp fa-solid fa-network-wired fs-5"></i>
                        {friendRequestCount > 0 && (
                          <span style={{
                            position: 'absolute',
                            right: '15px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '1px 5px',
                            fontSize: '10px'
                          }}>
                            {friendRequestCount}
                          </span>
                        )}
                      </div>
                      <div className='home'>
                        My Network
                      </div>
                    </div>
                  </Nav.Link>
                </div>


                <div className='me-2'>
                  <Nav.Link as={NavLink} to='jobs'>
                    <div className='text-center desktop-only'>
                      <div >
                        <i class="fa-sharp fa-solid fa-briefcase fs-5"></i>
                      </div>
                      <div className='home'>
                        Jobs
                      </div>
                    </div>
                  </Nav.Link>
                </div>

                <div className='me-2'>
                  <Nav.Link as={NavLink} to='message'>
                    <div className='text-center desktop-only'>
                      <div >
                        <i class="fa-sharp fa-solid fa-comment-dots fs-5"></i>
                      </div>
                      <div className='home'>
                        Messaging </div>
                    </div>
                  </Nav.Link>
                </div>

                <div className='me-2'>
                  <Nav.Link as={NavLink} to='notify'>
                    <div className='text-center desktop-only'>
                      {/* <div >
                        <i class="fa-sharp fa-solid fa-bell fs-5"></i>
                      </div> */}
                      <div style={{ position: 'relative' }}>
                        <i class="fa-sharp fa-solid fa-bell fs-5"></i>
                        {notificationCount > 0 && (
                          <span style={{
                            position: 'absolute',
                            right: '15px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '1px 5px',
                            fontSize: '10px'
                          }}>
                            {notificationCount}
                          </span>
                        )}
                      </div>
                      <div className='home'>
                        Notification
                      </div>
                    </div>
                  </Nav.Link>
                </div>


                <div className="profile-dropdown">
                  <DropdownButton id="dropdown-basic-button" title="Me">
                    <div style={{ display: 'flex', width: '265px' }}>
                      <div>
                        <img 
                        // src={profileImg} 
                        src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                        style={{ margin: '10px', width: "50px", height: '50px', borderRadius: '50%', marginTop: '10px' }} alt="" />
                      </div>
                      <div className='text' style={{ fontSize: '16px', fontWeight: '500' }}>{firstname + " " + lastname}
                        <p style={{ fontSize: '12px' }}>FrontEnd Developer||React||Javascript||React Native||Angular</p>
                      </div>
                    </div>
                    <div className='p-1'>
                      <Button onClick={() => Navigate("/Feed/profile")} variant="contained" style={{ width: '100%', height: '22px', borderColor: '#0A66C2', borderRadius: '20px', borderWidth: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>View Profile</Button>
                    </div>
                    <div className='AccMan'>
                      Account
                    </div>
                    <div className='AccMan'>
                      Manage
                    </div>

                    <div className='ms-auto logout desktop-only'>
                      <Button onClick={logout} size='small' variant='light'>LogOut</Button>
                    </div>
                  </DropdownButton>
                </div>
              </div>


            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Outlet />
    </div>
  </>
  );
}

export default BasicExample;