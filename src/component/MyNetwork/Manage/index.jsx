import React from 'react'
import './index.css'
import Card from 'react-bootstrap/Card';
import { Divider } from 'antd';

function Index() {
  return (
    <div>
       <div className='  mt-2 stickyLeftSideMang'>
                <Card style={{ borderRadius: '10px' }}>
                    <h6 className='m-3'>Manage my network</h6>
                    <div style={{padding:'5px'}}>
                        <ul className='list'>
                            <li><i className="mb-2 fa-solid fa-people-group"></i><span className='ms-1'>Connections</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Following & folloers</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Groups</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Events</span></li>
                            <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Pages</span></li>
                        </ul>
                        <h6 className='ms-3 text-primary'>Groups</h6>
                        <div>
                            <ul className='list'>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Python Developer Community</span></li>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>Javascript</span></li>
                                <li><i className="mb-2 fa-solid fa-people-group"></i> <span className='ms-1'>UI-Developer</span></li>
                            </ul>
                        </div>
                        <h6 className='ms-2 text-primary'>Evnets<i className="mt-2 me-2 float-end fa-solid fa-plus text-dark"></i></h6>
                        <div>
                            <h6 className='ms-2 mt-4 text-primary'>Folled Hashtag</h6>
                        </div>
                        <div>
                            <Divider />
                            <span className='d-flex justify-content-center mb-4 '> Discover More</span>
                        </div>
                    </div>
                </Card>
            </div>
    </div>
  )
}

export default Index
