import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToastNotification } from '../helpers/showToastNotification';
import { handleSignup } from '../Services/LoginService';

function Signup() {


  const navigate = useNavigate();
  
  const [btn, setBtn] = useState(false);
  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: ''
  })

  const handlechange = (e) => {

    const { name, value } = e.target;

    console.log(name, value, 'name');

    const copyFormData = { ...formData }

    copyFormData[name] = value;

    setFormData(copyFormData)

    console.log(copyFormData, 'copyFormData');

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

  }

  const validateForm = () => {

    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 4) {
      newErrors.name = "Name length must be at least 4 characters long"
      isValid = false;
    }


    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (formData.email.trim() && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }



    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = "password length must be at least 4 characters long"
      isValid = false;
    }




    setErrors(newErrors);
    return isValid;


  };



  const handleSignupBtn = async (e) => {

    e.preventDefault();

    

    if (validateForm()) {

      setBtn(true)

      try {

        const result = await handleSignup(formData);
        // console.log(result);

        if (result && result.data && result.data.success === true) {
          showToastNotification('success', result.data.message)
          // localStorageData.set('token', result.data.jwtToken)
          // dispatch(setUserData(result.data));
          // updateState();
          navigate('/login');
        }
        setBtn(false)

      } catch (error) {
        showToastNotification('warning', error.response.data.message)
        setBtn(false)
      }
    }

  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form>
          {/* <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div> */}
          <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handlechange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                  }`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handlechange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                  }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handlechange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                  }`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          <button
            type="submit"
            disabled={btn}
            onClick={handleSignupBtn}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Signup
          </button>
        </form>
       <Link to={'/login'}>Login</Link>
      </div>
    </div>
    </>
  );
}

export default Signup;
