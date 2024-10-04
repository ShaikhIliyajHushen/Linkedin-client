import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect } from 'react';
import { apiFetch } from '../api/api_Endpoints';

function VideoUploadModel(props) {
    const [show, setShow] = useState(true);
    const [video, setVideo] = useState(null);
    const [gettingBackendData, setGettingBackendData] = useState([])

    const handleClose = () => props.onClose(true)
    const handleDismiss = () => props.onClose(false)


    const VideoOnChang = (e) => {
        let video = e.target.value;
        // const file = e.target.files[0]; 
        console.log(video)
        setVideo(video)
    }



    // useEffect(() => {
    //     let a = localStorage.getItem("id")
    //     // axios.get(`http://localhost:3003/signup/${a}`)
    //     //     .then((res) => {
    //     const res = apiFetch(' GET_ONE_SIGNUP', { a }, 'GET' )
    //     if (res.data.imageData) {
    //         setGettingBackendData(res.data.imageData)
    //     }

    //     // })
    //     // .catch((err) => {
    //     //     console.log(err)
    //     // })
    // }, [])

    useEffect(() => {
        const fetchBackendData = async () => {
            const a = localStorage.getItem("id");
            try {
                const res = await apiFetch('GET_ONE_SIGNUP', { id: a });
                if (res.imageData) {
                    setGettingBackendData(res.imageData);
                }
            } catch (error) {
                console.error('Error fetching backend data:', error);
            }
        };
        
        fetchBackendData();
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


    // const upload = async (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value)
    //     let id = localStorage.getItem("id")
    //     const data = new FormData();
    //     data.append('file', video);
    //     data.append('upload_preset', 'LinkedinDataStore');
    //     data.append('cloud_name', 'dxfr1guyh');
    //     try {
    //         // Upload to Cloudinary
    //         const cloudinaryData = await apiFetch('CLOUDINARY_UPLOAD', {}, 'POST', data, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });
    //         const imageUrl = cloudinaryData.url;
    //         console.log('Cloudinary URL:', imageUrl);
    //         setVideo(imageUrl);

    //         // Perform the backend request
    //         const id = localStorage.getItem('id');
    //         // console.log('PostModel Trigger');

    //         const ImageData = [...gettingBackendData, {
    //             video: video,
    //             comments: [],
    //             time: getCurrentTime()
    //         }]

    //         await apiFetch('GET_ONE_SIGNUP', { id }, 'PUT', ImageData, {
    //             headers: { 'Content-Type': 'application/json' }
    //         });

    //         console.log('PostModel Successful');
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    //     // const video = e.target.value; // Assuming e.target.value contains the video input
    //     // if (!video) {
    //     //   console.log("Video input is empty");
    //     //   return; // Don't upload data if video input is empty
    //     // }



    //     // fetch(`http://localhost:3003/signup/${id}`, {
    //     //     method: "PUT",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify(ImageData)
    //     // })
    //     //     .then((res) => res.json())
    //     //     .then((data) => {
    //     //         console.log(data);
    //     //         window.location.reload();
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error('Error uploading image:', error);
    //     //     });
    // }

    const upload = async (e) => {
        e.preventDefault();

        if (!video) {
            console.log("No video selected");
            return; // Don't upload if no video is selected
        }

        const id = localStorage.getItem("id");
        const data = new FormData();
        data.append('file', video);
        data.append('upload_preset', 'LinkedinDataStore');
        data.append('cloud_name', 'dxfr1guyh');

        try {
            // Upload to Cloudinary
            const cloudinaryData = await apiFetch('CLOUDINARY_UPLOAD', {}, 'POST', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = cloudinaryData.url;
            console.log('Cloudinary URL:', imageUrl);

            const ImageData = [...gettingBackendData, {
                video: imageUrl, // Use the uploaded video URL
                comments: [],
                time: getCurrentTime()
            }];

            await apiFetch('GET_ONE_SIGNUP', { id }, 'PUT', ImageData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('PostModel Successful');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };


    return (
        <>
            <Box >
                <Modal show={show} onHide={handleDismiss} style={{}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please Give URL only</p>
                        <div>
                            <form onSubmit={upload}>

                                <div>
                                    <input className='videoInput' type="text" name="video" onChange={VideoOnChang} value={video} />
                                </div>
                                <div className='mt-4 videoBtn'>
                                    <Button type='submit'>Upload</Button>
                                </div>

                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal></Box>
        </>
    );
}

export default VideoUploadModel;



