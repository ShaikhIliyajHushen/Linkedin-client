import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import profileAvatr from '../Home/assets/ProfileImgAvtar.webp';
import { apiFetch } from '../api/api_Endpoints';
import { notification } from 'antd';


function UserName(props) {
    const { linkedId, email, password, setShowAnotherCard } = props
    const [firstname, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    const Context = React.createContext({
        name: 'Default',
      });
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.info({
        message: `Notification`,
        description: <Context.Consumer>{({ name }) => `Email ${name}!`}</Context.Consumer>,
        placement,
      });
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        console.log(e)
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setProfile(reader.result)
        }
    }



    const handlename = (e) => {
        setError(false)
        let firstname = e.target.value;
        console.log(firstname)
        if (firstname.length < 3) {
            setError(true)
        }
        else {
            setError(false)
        }
        setFirstName(firstname)
    }

    const handlLastename = (e) => {
        setError(false)
        let lastName = e.target.value;
        if (lastName.length < 3) {
            setError(true)
        }
        else {
            setError(false)
        }
        setLastName(lastName)
    }

    const [url, setUrl] = useState("");

    const handleJoinClick = async (e) => {
        e.preventDefault();
        // const data = new FormData();
        // data.append("file", profile);
        // data.append("upload_preset", "LinkedinDataStore");
        // data.append("cloud_name", "dxfr1guyh");

        let firstname = e.target[2].value;
        let lastName = e.target[3].value;
        let hasError = false;

        if (firstname.length < 3) {
            setError(true);
            hasError = true;
        }

        if (lastName.length < 3) {
            setError(true);
            hasError = true;
        }

        if (hasError) {
            return; // Exit the function if there's an error
        }
        let imageUrl = "";
        try {
             let imageUrl = ""
            if (profile) {
                const data = new FormData();
                data.append("file", profile);
                data.append("upload_preset", "LinkedinDataStore");
                data.append("cloud_name", "dxfr1guyh");

                const resp = await fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
                    method: "post",
                    body: data
                });
                const cloudinaryData = await resp.json();
                imageUrl = cloudinaryData.url;
                console.log("imageUrl====>", imageUrl)
            }
            const requestBody = {
                profile: imageUrl,
                firstname: firstname,
                lastname: lastName
            };
            const res = await apiFetch('UPDATE_PROFILE_NAME', { linkedId }, 'PUT', requestBody);
            // handleEmailSend()
            console.log("res",res);
            // navigate('/');
            if (res.status === 409 || res.message === 'Email already exists') {
                console.log('Email already exists, navigating to create account page.');
                setShowAnotherCard(false);
                navigate('/create_Account');
              } else {
                navigate('/');
              }
        } catch (err) {
            console.error('Error object:', err);
            if (err.status === 409 || err.data?.message === 'Email already exists') {
                console.log('Email already exists, navigating to create account page.');
                setShowAnotherCard(false);
            openNotification('topLeft');
                navigate('/create_Account');
              } else {
                console.error('Other error:', err);
                // Handle other types of errors if necessary
              }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", profile);
        data.append("upload_preset", "LinkedinDataStore");
        data.append("cloud_name", "dxfr1guyh");

        let firstname = e.target[2].value;
        let lastName = e.target[3].value;
        let hasError = false;

        if (firstname.length < 3) {
            setError(true);
            hasError = true;
        }

        if (lastName.length < 3) {
            setError(true);
            hasError = true;
        }

        if (hasError) {
            return; // Exit the function if there's an error
        }
        // handleJoinClick()
        try {
            const resp = await fetch("https://api.cloudinary.com/v1_1/dxfr1guyh/image/upload", {
                method: "post",
                body: data
            });
            const cloudinaryData = await resp.json();
            const imageUrl = cloudinaryData.url;
            // console.log("imageUrl====>", imageUrl)

            const requestBody = {
                profile: imageUrl,
                firstname: firstname,
                lastname: lastName
            };
            const res = await apiFetch('UPDATE_PROFILE_NAME', { linkedId }, 'PUT', requestBody);
            console.log(res);
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    // const sendEmail = async (to, subject, htmlContent, name) => {
    //     const sendarDetails = {
    //         to: to,
    //         subject: subject,
    //         html: htmlContent,
    //         recipientName: "Iliyas Husain"
    //     }
    //     try {
    //         const res = await apiFetch('SEND_EMAIL_NOTIFICATION', {}, 'POST', sendarDetails);
    //         console.log('Email sent', res);
    //     } catch (error) {
    //         console.error('Error sending email', error);
    //     }
    // };

    // const emailContent = `Congratilation your linkedin account is created ,Now you can connect the world`;

    // const handleEmailSend = () => {
    //     sendEmail(email, 'Linkedin Account is created', emailContent,);
    // }

    return (
        <div>
            <div className='name nameFL p-4 d-flex justify-content-center'>
                <Form onSubmit={handleJoinClick}>
                    <div className='d-flex justify-content-center'>
                        {/* <div className='profileImge mb-4'>
                            {profile == <img width={108} height={109} src={profileAvatr} alt="" /> || profile == null ? "" : <img width={108} height={109} src={profile} alt="" />}
                        </div> */}
                        <div className='profileImge mb-4'>
                            {profile ? (
                                <img width={108} height={109} src={profile} alt="User Profile" />
                            ) : (
                                <img width={108} height={109} src={profileAvatr} alt="Default Profile" />
                            )}
                        </div>

                        <div className='gallaryBtnProfile'>
                            <Button onClick={handleButtonClick} variant="light" >
                                <i class="fa-solid fa-camera"></i></Button>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />

                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                        <label className='labelEmail mb-1'>First Name</label>
                        <div>
                            <input className='inputSign' type="text" name="firstname" onChange={handlename} value={firstname} />
                        </div>
                    </Form.Group>
                    {error ? <span style={{ color: 'red' }}>Name min 2 charecter</span> : ""}

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <label className='labelEmail mb-1'>Last Name </label>
                        <div>
                            <input className='inputSign' type="text" name="lastName" onChange={handlLastename} value={lastName} />
                        </div>
                    </Form.Group>
                    {error ? <span style={{ color: 'red' }}>Last Name min 2 charecter</span> : ""}
                    <Button type='submit' className='agreeBtn'>Continue</Button>
                </Form>
            </div>
            <div className='dirnt'>
            </div>
        </div>
    )
}

export default UserName
