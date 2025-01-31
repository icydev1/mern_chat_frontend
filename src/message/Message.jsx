import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { handleChatHistory, handleMessageRoomListing, handleSendMessage } from '../Services/MessageService';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const socket = io(baseUrl);

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [roomListing, setRoomListing] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (data) => {
      setChatHistory((prev) => [...prev, data]);
      scrollToBottom();
    });
    return () => socket.off("message");
  }, []);

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data.room_id === selectedUser?._id) {
        setTypingUser(data.sender_id);
      }
      scrollToBottom();
      // Remove typing indicator after 3 seconds of inactivity
      setTimeout(() => {
        setTypingUser(null);
      }, 3000);
    });
  
    return () => socket.off("typing");
  }, [selectedUser]);

  useEffect(() => {
    fetchRoomListing();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const fetchRoomListing = async () => {
    try {
      const result = await handleMessageRoomListing();
      if (result?.data?.chatRooms) setRoomListing(result.data.chatRooms);
    } catch (error) {
      console.error("Error fetching room listing", error);
    }
  };

  const fetchChatHistory = async (id) => {
    try {
      const result = await handleChatHistory({ room_id: id });
      if (result?.data?.chatHistory) {
        setChatHistory(result.data.chatHistory);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error fetching chat history", error);
    }
  };

  const handleMessage = async (e) => {
    setMessage("");
    if (e && e.preventDefault) e.preventDefault(); // Ensure e exists before calling preventDefault

    if (message.trim() && selectedUser) {
      try {
        const formData = {
          receiver_id: selectedUser?.receiverList?._id,
          room_id: selectedUser?._id,
          content: message,
        };

        const result = await handleSendMessage(formData);

        if (result) {
          socket.emit("sendMessage", result?.data?.data);
          setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } catch (error) {
        console.log(error, "prifl");
      }
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);

    if (selectedUser) {
      socket.emit("typing", {
        sender_id: selectedUser?.authUser._id,
        room_id: selectedUser?._id,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar: User Listing (Full width on small screens) */}
    <div className="w-full sm:w-1/4 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-center">Users</h2>
      <ul className="flex-1 overflow-y-auto max-h-[75vh]">
        {roomListing.map((user) => (
          <li
            key={user?._id}
            className={`p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
              selectedUser?._id === user?._id ? "bg-blue-100" : ""
            }`}
            onClick={() => {
              setSelectedUser(user);
              fetchChatHistory(user._id);
            }}
          >
            {user?.receiverList?.name}
          </li>
        ))}
      </ul>
    </div>
  
    {/* Chat Panel */}
    <div className="flex-1 flex flex-col bg-white p-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        {selectedUser
          ? `Chat with ${selectedUser?.receiverList?.name}`
          : "Select a user to start chatting"}
      </h2>
  
      {selectedUser && (
        <>
          {/* Chat History (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg">
            {chatHistory.map(
              (val, index) =>
                val?.room_id === selectedUser?._id && (
                  <div
                    key={index}
                    className={`flex ${
                      val.sender_id === selectedUser?.receiverList?._id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-xs ${
                        val.sender_id === selectedUser?.receiverList?._id
                          ? "bg-gray-200"
                          : "bg-blue-100 self-end"
                      }`}
                    >
                      {val.content}
                    </div>
                  </div>
                )
            )}
  
            {typingUser && typingUser === selectedUser?.receiverList?._id && (
              <div className="flex justify-start">
                <div className="p-2 rounded-lg max-w-xs bg-gray-200 italic text-sm">
                  {selectedUser?.receiverList?.name} is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
  
          {/* Chat Input (Fixed at Bottom) */}
          <div className="p-2 bg-white border-t flex items-center gap-4">
            <textarea
              value={message}
              onChange={handleMessageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleMessage}
              className="w-24 sm:w-28 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  </div>
  
  

  );
};

export default Message;
