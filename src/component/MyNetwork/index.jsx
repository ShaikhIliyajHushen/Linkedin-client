import React from 'react'
import Manage from './Manage';
import Connect from './Connect';

const Index = () => {
  return (
    <>
      <div style={{ display: 'flex', marginTop: '50px', justifyContent: 'center' }}>
        <div className=' col-md-8 col-lg-3' style={{ width: '20%', marginRight: '20px' }}>
          <Manage />
        </div>
        <div style={{ width: '55%',marginTop:'6px' }}>
          <Connect />
        </div>
      </div>
    </>
  )
}
export default Index;