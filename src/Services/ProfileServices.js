// handleFollowUnfollow
import axiosInstance from "./axiosConfig";

const handleFollowUnfollow = async (formData) => {
  try {
    const response = await axiosInstance.post('user/follow-unfollow', formData);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const handleFriendListing = async (formData) => {
    try {
      const response = await axiosInstance.get('post/get-friend-lists', formData);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



export {
    handleFollowUnfollow,
    handleFriendListing
 
};