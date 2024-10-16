// apiUtils.js

import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const cloudinaryUrl = process.env.REACT_APP_CLOUD_STORAGE_URL;

export const API_ENDPOINTS = {

    //SingUp and Post Details
    GET_ALL_SIGNUP: `${baseUrl}/signup`,
    GET_ONE_SIGNUP: (id) => `${baseUrl}/signup/${id}`,
    DELETE_POST: (userId, userPostID) => `${baseUrl}/deletePost/?UserID=${userId}&UserPostID=${userPostID}`,
    DELETE_COMMENT: (userId, postId, commentId) => `${baseUrl}/deleteComment/comment/deleteComment?userId=${userId}&postId=${postId}&commentId=${commentId}`,
    ADD_COMMENT: (postId, userId) => `${baseUrl}/signup/comment/add?postId=${postId}&userId=${userId}`,
    REPLY_TO_COMMENT: (userId, postId, commentId) => `${baseUrl}/reply/add/replyToComment?userId=${userId}&postId=${postId}&commentId=${commentId}`,
    UPDATE_PROFILE_NAME:(linkedId) =>`${baseUrl}/post/${linkedId}`,
    REPOST_DATA: (id) => `${baseUrl}/rePostData/${id}/sharePost`,
    CLOUDINARY_UPLOAD: `${cloudinaryUrl}`,
    GET_NOTIFICATION: (id) => `${baseUrl}getUserNotifications/${id}/notify`,
    GET_USERFRIEND_REQUEST:(id)=>`${baseUrl}/getUserFriendRequests${id}`,
   
    //User Login 
    LOGIN_DETAILS:`${baseUrl}/login`,
    GOOGLE_AUTH_LOGIN:`${baseUrl}/GoogleAuth`,

    //Using Ref
    SEND_EMAIL_NOTIFICATION:`${baseUrl}/emailNotify/email`,
    GET_ALL_POST:`${baseUrl}/posted/post`,
    GIVE_COMMENT_TO_POST:(postId)=>`${baseUrl}/post/Postcomment/add?postId=${postId}`,
    REPLY_TO_COMMENTS:`${baseUrl}/comment/reply/replyToComment`,
    UPLOAD_POST:(id)=>`${baseUrl}/post/upload/post/${id}`,
    FRIEND_LIST:(id)=>`${baseUrl}/list/friendList?userId=${id}`,
    SEND_FRIEND_REQUEST:`${baseUrl}/friendRequest/request`,
    GET_FRIEND_REQUEST:(id)=>`${baseUrl}/request/getAllFriendRequest?userId=${id}`,
    ACCEPT_REQUEST:`${baseUrl}/accepted/accept`,
    SEND_NOTIFICATION:`${baseUrl}/createNotify/notification`,
    GET_NOTIFICATION:(id)=>`${baseUrl}/getNotify/getNotification/${id}`,
    GET_SUGGESTED_FRIENDLIST: (id) => `${baseUrl}/signup/${id}`,
    REJECT_REQUEST:`${baseUrl}/reject/rejectRequest`,
    LIKE_ON_POST:(id)=>`${baseUrl}/like/likes/${id}`,
    GET_SUGGESTED_FRIENDS:(id)=>`${baseUrl}/getSuggestedFriends/${id}/friends`,
    FETCH_LIKED_POSTS:(id)=>`${baseUrl}/getLikePost/getLikesPost?userId=${id}`
};


export const apiFetch = async (endpointKey, params = {}, method = 'GET', requestBody = {}, options = {}) => {
    let endpoint = API_ENDPOINTS[endpointKey];
    if (typeof endpoint === 'function') {
        endpoint = endpoint(...Object.values(params));
    }
    console.log("Initial endpoint:", endpoint);
    const configMethod = (typeof method === 'string' ? method : 'GET').toUpperCase();

    const config = {
        ...options,
        method:configMethod,
        url: endpoint,
    };

    // Add request body if method is PUT or POST
    if (method === 'PUT' || method === 'POST' || method === 'DELETE') {
        config.data = requestBody;
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
         // Check if error has a response and include status code and data
         if (error.response && error.response.status === 409 || error.response.status === 400) {
            // Create a detailed error object including status and data
            const detailedError = {
                status: error.response.status,
                data: error.response.data,
                message: error.message
            };
            throw detailedError;
        // } else {
        //     // If no response, throw a generic error
        //     throw new Error(`Error fetching ${endpointKey}: ${error.message}`);
        // }
    } else if (error.message && error.message.includes("CORS")) {
        // Handle CORS error specifically
        throw new Error('CORS error: Your request was blocked due to CORS policy. Please check the server configuration.');
    } else {
        // If no response, throw a generic error
        throw new Error(`Error fetching ${endpointKey}: ${error.message}`);
    }
    }
};



// export const apiFetch = async (endpointKey, params = {}, method = 'GET', options = {}) => {
//     let endpoint = API_ENDPOINTS[endpointKey];
//     if (typeof endpoint === 'function') {
//         endpoint = endpoint(...Object.values(params));
//     }

//     const config = {
//         ...options,
//         method,
//         url: endpoint, // Assign the endpoint URL separately
//     };

//     try {
//         const response = await axios(config); // Pass config object to axios
//         return response.data;
//     } catch (error) {
//         throw new Error(`Error fetching ${endpointKey}: ${error.message}`);
//     }
// };



// export const apiFetch = async (endpointKey, params = {}, options = {}) => {
//     let endpoint = API_ENDPOINTS[endpointKey];
//     if (typeof endpoint === 'function') {
//         endpoint = endpoint(...Object.values(params));
//     }
//     try {
//         const response = await axios(endpoint, options);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Error fetching ${endpointKey}: ${error.message}`);
//     }
// };
