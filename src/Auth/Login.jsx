import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogin } from '../Services/LoginService';
import { localStorageData } from '../helpers/token';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../action/dataAction.js';

function Login({updateState}) {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   

  const [formData , setFormData] = useState({
    // name:'',
    email:'',
    password:''
  })

  const handlechange = (e) => {

    const {name,value} = e.target;

    console.log(name,value,'name');
    
    const copyFormData = {...formData}

    copyFormData[name] = value;

    setFormData(copyFormData)

    console.log(copyFormData,'copyFormData');
    

  }



  const handlelogin = async (e) => {

    e.preventDefault();

    console.log("login");

    try {

      const result = await handleLogin(formData);
      // console.log(result);

      if(result && result.data && result.data.success === true){
        localStorageData.set('token', result.data.jwtToken)
        dispatch(setUserData(result.data));
        updateState();
        
      }
        navigate('/');
      
      

      
      
    } catch (error) {
      
      console.log(error);
      navigate('/');
    }
      

  }

  // const loginUser = async (e) => {
  //   e.preventDefault();

  //   console.log(validateForm(), "validate form");

  //   if (validateForm('login')) {

  //     setBtn(true)

  //     console.log(formData, 'formData');

  //     try {
  //       const result = await handleLogin(formData);

  //       if (result.data && result.data.data.token) {
  //         localStorageData.set('token', result.data.data.token)
  //         dispatch(setUserData(result.data.data.user));
  //         onLogin();
  //         setBtn(false)
  //       }
  //       setBtn(false)
  //       showToastMessage('success', result.data.message)

  //       console.log(result?.data?.data?.user?.role,'result?.data?.data?.user?.role');

  //       if(result?.data?.data?.user?.role === 'manager'){
  //         navigate('/staff');
  //       }else{
  //         navigate('/');
  //       }
       

  //     } catch (error) {
  //       setBtn(false)
  //       console.log(error);
  //       showToastMessage('error', error.response.data.message)
  //     }

  //   } 
  // };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handlelogin}
          >
            Login
          </button>
        </form>
        <Link to={'/signup'}>Signup</Link>
      </div>
    </div>
    </>
  );
}

export default Login;
