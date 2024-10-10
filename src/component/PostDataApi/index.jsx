import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './index.css'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import jwt_decode from "jwt-decode";
import Skeleton from '@mui/material/Skeleton';
import RePostModel from '../PostModel/RePostModel'
import { Divider } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { API_ENDPOINTS, apiFetch } from '../api/api_Endpoints';
import HighlightedComment from './HighlightedComment';

function Index() {
    const [likeBtn, setLikeBtn] = useState({});
    const [isCommentVisible, setCommentVisible] = useState({});
    const [cart, setCart] = useState([]);
    const [imageUrl, setImageUrl] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [commentDetails, setCommentDetails] = useState();
    const [text, setText] = useState('');
    const [post, setPost] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyStates, setReplyStates] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    const [commentRname, setCommentR] = useState('')
    const [likeCount, setLikeCount] = useState({})

    const { setProfileImg, setCoverImg, profileImg, welcome } = useContext(UserContext);

    const TokenData = localStorage.getItem("Token")
    const decodedToken = jwt_decode(TokenData)
    const { firstname, lastname, profile, id } = decodedToken;
    let fullName = firstname + " " + lastname


    //Minimum Comment Show Initial
    const MinimumComments = 2; //
    const [showAllComments, setShowAllComments] = useState(false);

    const Liked = (postId) => {
        setLikeBtn(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    useEffect(() => {
        // getCartData()
        // getOneCartData()
        getAllPost()
    }, [])

    // function getOneCartData() {
    //     axios
    //         .get(`http://localhost:3003/signup/${id}`)
    //         .then((res) => {
    //             setCoverImg(res.data.cover)
    //             setProfileImg(res.data.profile)
    //             // console.log(res.data)
    //         })
    //         .catch((err) => {
    //             console.log('API Error:', err);
    //         })
    // }

    //Working env

    // const getCartData = async () => {
    //     try {
    //         const res = await apiFetch(`GET_ALL_SIGNUP`);
    //         // console.log("GET_ALL_SIGNUP", res.data)
    //         // setCart(res.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const getAllPost = async () => {
        try {
            const res = await apiFetch('FRIEND_LIST', { id }, 'GET');
            setCart(res.combinedData)
            // console.log("res.data",res.combinedData)
            const initialLikeBtnState = {};
            const initialLikeCountState = {};

            res.combinedData.forEach((post) => {
                initialLikeBtnState[post._id] = post.likedByUser; // Assuming your API returns if the user liked the post
                initialLikeCountState[post._id] = post.likes.length || 0;
            });

            setLikeBtn(initialLikeBtnState);
            setLikeCount(initialLikeCountState);
        }
        catch (err) {
            console.log(err)
        }
    }

    const deletePost = async (userId, userPostID) => { //Working env
        try {
            await apiFetch('DELETE_POST', { userId, userPostID }, 'DELETE');
            console.log('Post deleted successfully');

            // Update cart state after successful deletion
            const updatedCart = cart.filter(item => item._id !== userId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const postComment = (e) => {
        const text = e.target.value;
        setText(text);
        console.log(text);
        setPost(!!text);
    };

    const deleteComment = async (userId, postId, commentId) => {
        // fetch(`http://localhost:3003/deleteComment/comment/deleteComment?userId=${userId}&postId=${postId}&commentId=${commentId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('Comment deleted:', data);
        //         // Update the UI or state here to reflect the deleted comment
        //     })
        //     .catch((err) => {
        //         console.error('Error deleting comment:', err);
        //     });
        try {
            await apiFetch('DELETE_COMMENT', { userId, postId, commentId }, 'DELETE');
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    //Working env
    const Uploadcomment = async (postId) => {
        let postID = postId._id
        const notificationCreate = {
            commentId: null,
            postId: postID,
            type: 'comment',
            actor: id,
            recipient: postId.recipient
        };
        // console.log("notificationCreate", notificationCreate)
        const commentDetails = {
            profile: profileImg,
            firstname: firstname,
            lastname: lastname,
            comment: text,
            updatedAt: new Date().toISOString()
        };
        try {
            if (postId) {
                await apiFetch('GIVE_COMMENT_TO_POST', { postID }, 'POST', commentDetails);
                console.log('Comment uploaded successfully');
                setText('');
                getAllPost();
            }
            await apiFetch('SEND_NOTIFICATION', {}, 'POST', notificationCreate);

        } catch (error) {
            console.error('Error uploading comment:', error);
        }
    };

    // const Uploadcomment = async (postId, userId) => {
    //     const commentDetails = {
    //         profile: profileImg,
    //         name: fullName,
    //         comment: text,
    //         updatedAt: new Date().toISOString()
    //     };
    //     try {
    //         const res = await fetch(`http://localhost:3003/signup/comment/add?&postId=${postId}&userId=${userId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(commentDetails),
    //         });
    //         const result = await res.json();
    //         console.log(result);
    //         setText('');
    //         getCartData()
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const onEmojiClick = (emojiObject) => {
        if (activeInput === 'comment') {
            setText(prevText => prevText + emojiObject.emoji);
            setShowEmojiPicker(false);
        } else if (activeInput === 'reply') {
            setReplyText(prevText => prevText + emojiObject.emoji);
            setShowReplyEmojiPicker(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'comment') {
            setText(value);
        } else if (name === 'reply') {
            setReplyText(value);
        }
    };

    const CommentVisibility = (postId) => {
        setCommentVisible(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    function onVerifyClose(result) {
        if (!result) {
            setImageUrl(false)
            return
        }
    }

    const handleRepost = (userDetails, commentDetails) => {
        setUserDetails(userDetails);
        setCommentDetails(commentDetails);
        setImageUrl(!imageUrl)
    }

    const handleReply = (commentId, commentName) => {
        // console.log("commentName",commentName)
        setReplyStates(prevStates => ({
            ...prevStates,
            [commentId]: !prevStates[commentId]
        }));
        setCommentR(commentName)
    };

    // const handleCommentChange = (e) => {
    //     // setText(e.target.value);
    //     setReplyText(e.target.value)
    //     // const { value } = e.target;
    //     // const mention = ;
    //     // setText(mention + value);
    // };

    //Working env
    const handleCommentReply = async (comment, postID) => {
        // console.log("comment",comment)
        // console.log("post",postID)
        const notificationCreate = {
            commentId: comment._id,
            postId: postID._id,
            type: 'reply',
            actor: id,
            recipient: postID.recipient
        };
        const replyCommentDetails = {
            commentId: comment._id,
            profile: profileImg,
            firstname: firstname,
            lastname: lastname,
            comment: `@${commentRname} ${replyText}`,
            createdAt: new Date().toISOString()
        };
        try {
            // const res = await apiFetch('REPLY_TO_COMMENTS', {}, 'POST', replyCommentDetails)
            // setReplyText('');
            // getAllPost();
            if (comment) {
                const res = await apiFetch('REPLY_TO_COMMENTS', {}, 'POST', replyCommentDetails);
                setReplyText('');
                getAllPost();
            }
            await apiFetch('SEND_NOTIFICATION', {}, 'POST', notificationCreate);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    //   const handleCommentReply = async(userID,postId,commentId)=>{
    //     // console.log("userID--66698eaa394966d4f16add0c",userID)
    //     // console.log("postId--6669910f394966d4f16add2d",postId)
    //     // console.log("commentId--666bd7aa2d2be5d97a7b4930",commentId)

    //     const replyCommentDetails = {
    //         profile: profileImg,
    //         name: fullName,
    //         comment: text,
    //         updatedAt: new Date().toISOString()
    //     };
    //     try {
    //         const res = await fetch(`http://localhost:3003/reply/replyToComment?&userId=${userID}&postId=${postId}&commentId=${commentId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(replyCommentDetails),
    //         });
    //         const result = await res.json();
    //         console.log(result);
    //         setText('');
    //         getCartData()
    //     } catch (err) {
    //         console.log(err);
    //     }

    //   }

    //Commented Time

    function formatTime(timestamp) {
        const now = new Date();
        const commentTime = new Date(timestamp);
        const diffInMs = now - commentTime;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        // console.log("Diifernt commentTime", commentTime)
        // console.log("Diifernt Ms", diffInMs)
        // console.log("Diifernt Day", diffInDays)
        if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };
        const formattedTime = commentTime.toLocaleString('en-US', options);
        return formattedTime;
    }


    const Skeletons = () => (
        <div className='col-12 text-center nodata' >
            <Card className='mb-1 responsive responsiveTablet ' style={{ width: '35rem', height: '70vh', borderRadius: '12px', backgroundColor: 'white' }}>
                <div className='profileName d-flex'>
                    <div>
                        <Skeleton variant="circular" sx={{
                            width: "10vh",
                            height: "10vh",
                            margin: '20px'
                        }} />
                    </div>
                    <div className='userName mt-3'>
                        <Skeleton sx={{ width: '240px', height: '32px' }} />
                        <Skeleton sx={{ width: '200px', height: '31px' }} />
                        <Skeleton sx={{ width: '180px', height: '30px' }} />
                    </div>
                </div>
                <div>
                    <Skeleton sx={{ width: '100%', height: '350px', marginTop: '0px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '100px', height: '24px', }}>
                        <Skeleton sx={{ width: '80px', height: '35px', }} />
                    </div>
                    <div style={{ width: '100px', height: '24px', }}>
                        <Skeleton sx={{ width: '80px', height: '35px', }} />
                    </div>
                    <div style={{ width: '100px', height: '24px', }}>
                        <Skeleton sx={{ width: '80px', height: '35px', }} />
                    </div>
                </div>
            </Card>
        </div>
    )


 
      
      

    const [loadedImages, setLoadedImages] = useState({});

    const observer = useRef(null);
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            setLoadedImages((prev) => ({
                                ...prev,
                                [img.dataset.id]: true,
                            }));
                            obs.unobserve(img);
                        }
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );
    }, []);

    useEffect(() => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach((img) => observer.current.observe(img));
        return () => observer.current.disconnect();
    }, [cart]);


    // const handleLikesOnPost = async (postId) => {
    //     try {
    //         const userId = {
    //             userId: id
    //         };
    //         const response = await apiFetch('LIKE_ON_POST', { postId }, 'POST', userId);
    //         // const result =  response.json();
    //         console.log("Likes count", response)
    //         setLikeCount(response?.likeCount)

    //         setLikeBtn((prev) => ({
    //             ...prev,
    //             [postId]: response.liked // Update the liked status for this post
    //         }));

    //         setLikeCount((prev) => ({
    //             ...prev,
    //             [postId]: response.likeCount // Update the like count for this post
    //         }));

    //     } catch (error) {
    //         console.error('Error updating likes', error);
    //     }
    // };

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await apiFetch('FETCH_LIKED_POSTS', { id }, 'GET');
                const likedPosts = response?.likedPosts || [];
                console.log("likedPosts", likedPosts)
                const likeButtonState = likedPosts.reduce((acc, post) => {
                    acc[post._id.toString()] = true;  // Use _id as the key
                    return acc;
                }, {});

                console.log("likeButtonState", likeButtonState)
                setLikeBtn(likeButtonState);
            } catch (error) {
                console.error("Error fetching liked posts", error);
            }
        };

        fetchLikedPosts();
    }, []);


    const handleLikesOnPost = async (postId) => {
        try {
            const userId = {
                userId: id // Assume 'id' is the logged-in user ID
            };

            const response = await apiFetch('LIKE_ON_POST', { postId }, 'POST', userId);

            setLikeBtn((prev) => ({
                ...prev,
                [postId]: response.liked
            }));

            setLikeCount((prev) => ({
                ...prev,
                [postId]: response.likeCount
            }));
        } catch (error) {
            console.error('Error updating likes', error);
        }
    };

  console.log("welcome",welcome)

    return (
        <>
            <div>
                {cart?.length > 0 ? (
                    cart?.map((items) => (
                        <Card className='mb-3 responsive responsiveTablet' style={{ width: '35rem', borderRadius: '12px' }} key={items._id}>
                            <div className='profileName d-flex'>
                                <div>
                                    <img className='profileImg mt-3 me-2 ms-3'
                                        // src={items?.profile} 
                                        // src={items?.profile ? items?.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        // alt="" 
                                        src={
                                            loadedImages[items._id]
                                                ? items.profile
                                                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                        }
                                        data-src={items.profile ? items.profile : ''}
                                        alt=""
                                        data-id={items._id}
                                    />
                                </div>
                                <div className='userName mt-3'>
                                    <h5 style={{ fontSize: 'medium' }}>
                                        <Link
                                            to={`/Feed/profile/${items?._id}`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {items.firstname + " " + items.lastname}
                                            <span className='ms-1' style={{ fontSize: '14px' }}>(He/Him)</span>
                                        </Link>
                                        <p style={{ fontSize: '14px' }}>
                                            Full stack Developer <br />
                                            <span style={{ fontSize: '14px' }}>
                                                {items.time}
                                                <i className="fa-solid fa-earth-americas"></i>
                                            </span>
                                        </p>
                                    </h5>
                                </div>
                                <div className='ms-auto'>
                                    <Button onClick={() => deletePost(items._id, items._id)} className='deleteBtn' variant='light'>
                                        <i className="fa-solid fa-xmark fs-5"></i>
                                    </Button>
                                </div>
                            </div>

                            {items?.caption && items.caption !== "" && (
                                <div className='m-2'>
                                    {items.caption}
                                </div>
                            )}
                            <div>
                                {items?.image && items.image !== "" && (
                                    // <img
                                    //     className='postImg'
                                    //     src={items.image}
                                    //     alt='Post Image'
                                    //     key={items.image}
                                    // />
                                    <img
                                        className="postImg"
                                        src={loadedImages[items._id + '-post']
                                            ? items.image
                                            : 'https://via.placeholder.com/600x400'} // Placeholder for lazy loading
                                        data-src={items.image}
                                        alt="Post Image"
                                        data-id={items._id + '-post'}
                                    />
                                )}
                                {items?.video && items.video !== "" && (
                                    items.video.includes('youtube.com') || items.video.includes('youtu.be') ? (
                                        <iframe
                                            className='postVideo'
                                            width='560'
                                            height='315'
                                            src={items.video}
                                            title='YouTube Video'
                                            frameBorder='0'
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                            allowFullScreen
                                            key={items.video}
                                        ></iframe>
                                    ) : (
                                        <video className='postVideo' controls key={items.video}>
                                            <source src={items.video} type='video/mp4' />
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                )}
                                {!items.image && !items.video && !items.caption && (
                                    <div>Post not available</div>
                                )}
                            </div>

                            <div className='comment'>
                                <div className='d-flex justify-content-between p-2'>
                                    <div className="icon-container">
                                        <i className="fas fa-thumbs-up text-primary"></i>
                                        <i className="far fa-laugh text-success"></i>
                                        <i className="fas fa-heart text-danger"></i>
                                        {/* {items?.likes?.length || 0} */}
                                        {likeCount[items._id] || 0}
                                    </div>
                                    <div>
                                        {items?.comment?.length || 0} comments
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <ButtonGroup className='btnGrouplike' aria-label="Basic example">
                                        {/* <Button className='btnlLike' variant="light" onClick={() => Liked(items._id)}>
                                            {likeBtn[items._id] ? <i className="fa-solid fa-thumbs-up fs-4"></i> : <i className="fa-regular fa-thumbs-up fs-4"></i>}
                                            <span className='m-2 btnicons'>Like</span>
                                        </Button> */}
                                        {/* <Button
                                            className='btnlLike'
                                            variant="light"
                                            onClick={() => handleLikesOnPost(items._id)}
                                        >
                                            {likeBtn[items._id] ? (
                                                <i className="fa-solid fa-thumbs-up fs-6"></i>  // Liked state (solid icon)
                                            ) : (
                                                <i className="fa-regular fa-thumbs-up fs-6"></i>  // Unliked state (outline icon)
                                            )}
                                            <span className="m-2 btnicons">Like</span>
                                        </Button> */}

                                        <Button
                                            className='btnlLike'
                                            variant="light"
                                            onClick={() => handleLikesOnPost(items._id)}
                                        >
                                            {likeBtn[items._id] ? (
                                                <i className="fa-solid fa-thumbs-up fs-6"></i>  // Liked state (solid icon)
                                            ) : (
                                                <i className="fa-regular fa-thumbs-up fs-6"></i>  // Unliked state (outline icon)
                                            )}
                                            <span className="m-2 btnicons">Like</span>
                                            {console.log("likeBtn[items._id]:", likeBtn[items._id])}
                                            {console.log("Type of items._id:", typeof items._id)};
                                        </Button>


                                        <Button className='btnlCmtRe' variant="light" onClick={() => CommentVisibility(items._id)}>
                                            <i className="fa-regular fa-comment fs-6"></i>
                                            <span className='m-2'>Comment</span>
                                        </Button>
                                        <Button className='btnlCmtRe' variant="light" onClick={() => handleRepost(items, items)}>
                                            <i className="fa-solid fa-arrows-spin fs-6"></i>
                                            <span className='m-2'>Repost</span>
                                        </Button>
                                        <Button className='btnlSend' variant="light">
                                            <i className="fa-solid fa-paper-plane fs-6"></i>
                                            <span className='m-2'>Send</span>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>

                            {isCommentVisible[items._id] && (
                                <form>
                                    <div className='d-flex m-2'>
                                        <div>
                                            <img className='CommnetImg'
                                                // src={profileImg} 
                                                src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                alt="" />
                                        </div>
                                        <div className='ComnentIn'>
                                            <input
                                                className='ComnentInput'
                                                name="comment"
                                                onChange={handleInputChange}
                                                onFocus={() => setActiveInput('comment')}
                                                placeholder='Add a comment...'
                                                type="text"
                                                value={text}
                                            />
                                            {text && <Button onClick={() => Uploadcomment(items)} className='postCommnetBtn m-2'>Post</Button>}
                                        </div>
                                        <div className='d-flex justify-content-center comIcon'>
                                            <div className='me-3'>
                                                <i
                                                    className="fa-regular fa-face-smile fs-5"
                                                    onClick={() => {
                                                        setActiveInput('comment');
                                                        setShowEmojiPicker(prev => !prev);
                                                    }}
                                                ></i>
                                                {showEmojiPicker && (
                                                    <div style={{ position: 'absolute', zIndex: 1 }}>
                                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className='ms-2'>
                                                <i className="fa-regular fa-image fs-5"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <span className='fs-6 ms-3'>Most Relevant<i className="fa-sharp fa-solid fa-caret-down ms-1"></i></span>

                                    <div>
                                        {items.comment
                                            ?.slice(0, showAllComments ? items.comment.length : MinimumComments)
                                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                            .map((comment, index) => (
                                                <div key={comment._id || index}>
                                                    <div className='d-flex ms-2' style={{ position: 'relative' }}>
                                                        <div className='mt-3 ms-2'>
                                                            <img className='commentProfile'
                                                                // src={comment.profile} 
                                                                src={comment.profile ? comment.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                                alt="" />
                                                        </div>
                                                        <div className='ms-2 commentName'>
                                                            {comment.firstname + " " + comment.lastname}
                                                            <div className='time d-flex'>
                                                                <div>
                                                                    {formatTime(comment.updatedAt)}
                                                                    {fullName === comment.firstname + " " + comment.lastname && (
                                                                        <button
                                                                            type="button"
                                                                            style={{ background: 'none', border: 'none' }}
                                                                            onClick={() => deleteComment(items._id, items._id, comment._id)}
                                                                        >
                                                                            <i className="fa-solid fa-trash-can"></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p style={{ fontSize: 'small' }}>FrontEnd Developer (React/Redux/JavaScript)</p>
                                                            <span className='msg'>{comment.comment}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '10%', marginLeft: '100px' }}>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className='replyBtn'
                                                            >
                                                                Like
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className='replyBtn'
                                                                onClick={() => handleReply(comment._id, comment.firstname)}
                                                            >
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {replyStates[comment._id] && (
                                                        <div>
                                                            <form>
                                                                <div className='d-flex mt-2' style={{ marginLeft: '59px' }}>
                                                                    <div>
                                                                        <img className='CommnetImg'
                                                                            // src={profileImg} 
                                                                            src={profileImg ? profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                                            alt="" />
                                                                    </div>
                                                                    <div className='ComnentIn'>
                                                                        <input
                                                                            className='ReplyInput'
                                                                            name="reply"
                                                                            onChange={handleInputChange}
                                                                            placeholder={commentRname ? commentRname : 'Add a reply...'}
                                                                            type="text"
                                                                            value={replyText}
                                                                        />
                                                                        {replyText && <Button onClick={() => handleCommentReply(comment, items)} className='postCommnetBtn m-2'>Post</Button>}
                                                                    </div>
                                                                    <div className='d-flex justify-content-center comIcon'>
                                                                        <div className='me-1'>
                                                                            <i
                                                                                className="fa-regular fa-face-smile fs-5"
                                                                                onClick={() => {
                                                                                    setActiveInput('reply');
                                                                                    showReplyEmojiPicker(prev => !prev)
                                                                                }}
                                                                            ></i>
                                                                            {showReplyEmojiPicker && (
                                                                                <div style={{ position: 'absolute', zIndex: 1 }}>
                                                                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className='ms-2'>
                                                                            <i className="fa-regular fa-image fs-5"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    )}
                                                    <div className='d-flex flex-column'>
                                                        {comment.replies
                                                            .map((reply, index) => (
                                                                <div className='d-flex ms-5' key={reply._id || index}>
                                                                    <div className='mt-3 ms-3'>
                                                                        <img className='commentProfile'
                                                                            // src={reply.profile} 
                                                                            src={reply.profile ? reply.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                                            alt="" />
                                                                    </div>
                                                                    <div className='ms-1 commentName'>
                                                                        {reply.firstname + " " + reply.lastname}
                                                                        <div className='time d-flex'>
                                                                            <div>{formatTime(reply.updatedAt)}</div>
                                                                        </div>
                                                                        <p style={{ fontSize: 'small' }}>FrontEnd Developer (React/Redux/JavaScript)</p>
                                                                        {/* <span className='msg'>{reply.comment}</span> */}
                                                                        <HighlightedComment comment={reply.comment} />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        {!showAllComments && items.comment.length > MinimumComments && (
                                            <div className='see-more-comments'>
                                                <button className='btn btn-varint' onClick={() => setShowAllComments(true)}>Load more comments</button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            )}
                        </Card>
                    ))
                ) : (
                    [1, 2, 3].map((items) => <Skeletons key={items} />)
                )}
                {imageUrl ? <RePostModel onClose={onVerifyClose} sharePostDetails={{ userDetails: userDetails, commentDetails: commentDetails }} /> : ""}
            </div>
        </>

    )
}

export default Index








