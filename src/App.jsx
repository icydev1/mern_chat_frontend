import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

import Sidebar from './partial/Sidebar';
import Navbar from './partial/Navbar';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader.jsx';
import { localStorageData } from './helpers/token.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './action/dataAction.js';
import { handleUserProfile } from './Services/LoginService.js';
import { handlePostListing } from './Services/PostServices.js';
import { ToastContainer, toast } from 'react-toastify';
import { showToastNotification } from './helpers/showToastNotification.js';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setLoading] = useState(true); // Add a loading state
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [postData, setPostData] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const token = localStorageData.get('token');

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const result = await handleUserProfile(token);

          if (result && result.data) {
            setLoggedIn(true);
            dispatch(setUserData(result?.data?.data));
          }
        } catch (error) {
          setLoggedIn(false);
          localStorageData.remove('token');
          // window.location.href = "/";
        }
      } else {
        setLoggedIn(false);
      }
      setLoading(false); // Mark loading as complete
    };

    fetchData();
    if (token) {
      fetchPosts();
    }



  }, [dispatch, token]);

  

  const logout = (e) => {

    e.preventDefault()
    showToastNotification('success','Logout Successfully')
    localStorageData.remove('token');
    setLoggedIn(false);
    // window.location.href = "/";

  }

  const fetchPosts = async () => {

    try {
      const result = await handlePostListing();


      if (result && result?.data?.posts) {
        setPostData(result?.data?.posts)
      }

    } catch (error) {
      // setLoggedIn(false);
      // localStorageData.remove('token');
      // window.location.href = "/";
      console.log('listing errror', error);

    }

  };



  console.log(publicRoutes, 'publicRoutespublicRoutes');


  return (
    <>
    <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        <Suspense fallback={<Loader />}>
          <Router>
            <div className="h-screen flex">
              {/* Sidebar: 20% */}

              <Sidebar
                isOpen={isSidebarOpen}
                logout={logout}
                className="w-1/5 min-w-[200px] bg-gray-800 text-white"
              />


              {/* Main Content: 60% */}
              <div className="flex-1 flex flex-col w-3/5">
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <div className="p-4 flex-1 bg-gray-100">
                  <Routes>
                    {privateRoutes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <route.element posts={fetchPosts} data={postData} />
                        }
                      />
                    ))}
                  </Routes>
                </div>
              </div>

              {/* Additional Panel: 20% */}
              <div className="w-1/5 min-w-[200px] bg-gray-200 p-4 hidden lg:block">
                <h2 className="text-xl font-semibold">Extra Panel</h2>
                <p className="text-gray-700 mt-2">
                  Here you can add additional content, links, or information.
                </p>
              </div>
            </div>
          </Router>
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          <Router>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <route.element updateState={() => setLoggedIn(true)} />
                  }
                />
              ))}
            </Routes>
          </Router>
        </Suspense>
      )}
    </>
  );
};



export default App;
