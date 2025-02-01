import { useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Passionate developer with 5+ years of experience in building user-friendly web applications. Loves coding, coffee, and hiking.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [phone, setPhone] = useState('(123) 456-7890');

  const handleSave = () => {
    // Handle save logic here (e.g., update the server or local storage)
    console.log('Profile updated:', { name, email, bio, location, phone });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://img.freepik.com/free-vector/smiling-boy-hoodie_1308-178004.jpg?semt=ais_hybrid"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
          <p className="mt-2 text-sm text-gray-500">Frontend Developer</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">About</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 text-sm text-gray-600 p-2 w-full border rounded-md"
            rows="4"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Details</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-4">
            <li>
              <span className="font-medium">Location:</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </li>
            <li>
              <span className="font-medium">Phone:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </li>
          </ul>
        </div>

        <div className="mt-6 flex justify-around">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Save Profile
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
          <Link to={'/profile'}>Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
