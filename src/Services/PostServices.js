import axiosInstance from "./axiosConfig";

const handlePost = async (formData) => {
  try {
    const response = await axiosInstance.post('post/upload-post', formData);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const handlePostListing = async (formData) => {
    try {
      const response = await axiosInstance.get('post/get-all-posts', formData);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



export {
  handlePost,
  handlePostListing
 
};