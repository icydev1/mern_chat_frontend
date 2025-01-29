import axiosInstance from "./axiosConfig";

const handleLogin = async (formData) => {
  try {
    const response = await axiosInstance.post('auth/login', formData);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const handleForgetPassword = async (forgetPasswordData) => {
  try {
    const response = await axiosInstance.post('forgot-password', forgetPasswordData);
    return response;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

const handleResetPassword = async (formData) => {
  try {
    const response = await axiosInstance.post('reset-email-password', formData);
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

const handleUserProfile = async () => {

  try {
    const response = await axiosInstance.get(`auth/get-profile`);
    return response; // Assuming you want to return the data from the response
  } catch (error) {
    console.log(error);
    localStorageData.remove('token')
    window.location.href = "/";
    console.error('Error fetching data:', error);
    throw error;
  }
};

export {
  handleLogin,
  handleForgetPassword,
  handleResetPassword,
  handleUserProfile
};