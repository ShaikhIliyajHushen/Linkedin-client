import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import './index.css'


function PostModel(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => props.onClose(true)
  const handleDismiss = () => props.onClose(false)

  return (
    <>
      <Box >
        <Modal show={show} onHide={handleDismiss} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>Who Can See Yor Post?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <p>Your post will be visible on feed, on your profile and in search results</p>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal></Box>
    </>
  );
}

export default PostModel;