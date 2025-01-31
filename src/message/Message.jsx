import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { handleChatHistory, handleMessageRoomListing, handleSendMessage } from '../Services/MessageService';
// import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const socket = io(baseUrl);
const Message = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [roomListing, setRoomListing] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

// console.log(selectedUser,'selectedUserselectedUserselectedUser');



  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data) => {
      console.log("Received from server:", data);
      // setMessage(data);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setChatHistory((prevMessages) => [...prevMessages, data]);

      
      
    });

    
    return () => socket.off("message");
  }, []);


  useEffect(() => {

    fetchRoomListing();
   
  }, [])
  


  const fetchRoomListing = async () => {

    // handleMessageRoomListing

    try {

      const result = await handleMessageRoomListing();

      console.log(result,'roomListingroomListing');
      

      if(result){
          setRoomListing(result?.data?.chatRooms);
      }
      

    } catch (error) {
      console.log(error,'prifl');
    }

  }

  const fetchChatHistoy = async (id) => {


    // e.preventDefault();

    try {

      const formData = {
          room_id : id ,
      }

     
      const result = await handleChatHistory(formData);

      console.log(result,'resultresult');
      

      if(result){
          setChatHistory(result?.data?.chatHistory);
          setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
      }
      

    } catch (error) {
      console.log(error,'prifl');
    }
    

  }


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessage = async (e) => {

    e.preventDefault();

      if (message.trim() && selectedUser) {

          try {

            const formData = {
              receiver_id : selectedUser?.receiverList?._id,
              room_id : selectedUser?._id,
              content : message
            }

      
        const result = await handleSendMessage(formData);

        if(result){
          
          socket.emit("sendMessage", result?.data?.data);
          setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
          // chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          setMessage(''); 
          // fetchChatHistoy(selectedUser?._id)
        }
        

      } catch (error) {
        console.log(error,'prifl');
      }

        
        
      }
  };

 


  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Users</h2>
        <ul>
          {roomListing.map((user) => (
            <li
              key={user?.receiverList?.id}
              className={`p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded-lg ${selectedUser && selectedUser?.receiverList?._id === user?.receiverList?._id
                  ? 'bg-blue-100'
                  : ''
                }`}
              // onClick={fetchChatHistoy()}
              onClick={(e) => {
                setSelectedUser(user);
                fetchChatHistoy(user._id);
            }}
            
            >
              {user?.receiverList?.name}
            </li>
          ))}
        </ul>
      </div>


      <div className="flex-1 bg-white p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedUser ? `Chat with ${selectedUser?.receiverList?.name}` : 'Select a user to start chatting'}
        </h2>
        {selectedUser &&   (
          <>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg h-80 overflow-y-auto flex flex-col space-y-4">
          {chatHistory.map((val, index) =>
            selectedUser._id === val.room_id && (
              <div
                key={index}
                className={`flex ${selectedUser?.receiverList?._id === val.sender_id ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    selectedUser?.receiverList?._id === val.sender_id ? 'bg-gray-200' : 'bg-blue-100 self-end'
                  }`}
                >
                  {val.content}
                </div>
              </div>
            )
          )}
          <div ref={chatEndRef} />
        </div>


            <textarea
              value={message}
              onChange={handleMessageChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleMessage}
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
