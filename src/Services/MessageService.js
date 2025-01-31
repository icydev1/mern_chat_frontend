// handleMessageRoom

// handleFollowUnfollow
import axiosInstance from "./axiosConfig";

const handleMessageRoom = async (formData) => {
  try {
    const response = await axiosInstance.post('message/create-room', formData);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const handleMessageRoomListing = async () => {
    try {
      const response = await axiosInstance.get('message/chat-room-listing');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


const handleSendMessage = async (formData) => {
    try {
      const response = await axiosInstance.post('message/send-message',formData);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


const handleChatHistory = async (formData) => {
    
    try {
      const response = await axiosInstance.post('message/get-chat-history',formData);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }


  };







export {
    handleMessageRoom,
    handleMessageRoomListing,
    handleSendMessage,
    handleChatHistory
 
};