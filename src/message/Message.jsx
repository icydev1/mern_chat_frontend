import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
// import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const socket = io(baseUrl);
const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);




  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data) => {
      console.log("Received from server:", data);
      setMessage(data);
    });

    // socket.emit("clientMessage", "Hello from client!");

    // Cleanup on component unmount
    return () => socket.off("message");
  }, []);





  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Lee' },
  ];

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      // console.log(`Message sent to ${selectedUser.name}: ${message}`);
      setMessage(''); // Clear the input after sending
    }
  };



  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded-lg ${selectedUser && selectedUser.id === user.id
                  ? 'bg-blue-100'
                  : ''
                }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>


      <div className="flex-1 bg-white p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user to start chatting'}
        </h2>
        {selectedUser && (
          <>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg h-80 overflow-y-auto flex flex-col space-y-4">

              <div className="flex justify-start">
                <div className="bg-gray-200 p-2 rounded-lg max-w-xs">Hello, how are you?</div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-100 p-2 rounded-lg max-w-xs self-end">I'm good, thanks! How about you?</div>
              </div>
            </div>

            <textarea
              value={message}
              onChange={handleMessageChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSendMessage}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Message;
