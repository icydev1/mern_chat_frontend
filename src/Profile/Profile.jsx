
const Profile = () => {
    return (
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600">johndoe@example.com</p>
            <p className="mt-2 text-sm text-gray-500">Frontend Developer</p>
          </div>
  
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">About</h3>
            <p className="mt-2 text-sm text-gray-600">
              Passionate developer with 5+ years of experience in building user-friendly web applications. Loves coding, coffee, and hiking.
            </p>
          </div>
  
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Details</h3>
            <ul className="mt-2 text-sm text-gray-600">
              <li><span className="font-medium">Location:</span> San Francisco, CA</li>
              <li><span className="font-medium">Phone:</span> (123) 456-7890</li>
              <li><span className="font-medium">Joined:</span> January 2023</li>
            </ul>
          </div>
  
          <div className="mt-6 flex justify-around">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Edit Profile</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">Log Out</button>
          </div>
        </div>
      </div>
    );
  };

  export default Profile;