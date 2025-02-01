import { useState } from "react";
import { IoSend, IoAttach, IoMic, IoHappy } from "react-icons/io5";
import { SweetAlert } from "./SweetAlert";

const ChatInput = ({ handleMessage , message , handleMessageChange }) => {

    const Msg = 'This Feature Coming Soon';
  

  return (
    <div className="p-2 bg-white border-t flex items-center gap-2 sticky bottom-0 z-10">
      <button className="text-gray-500 text-xl">
        <IoHappy
        onClick={() => SweetAlert(Msg)}
        
        />
      </button>
      <button className="text-gray-500 text-xl">
        <IoAttach
        onClick={() => SweetAlert(Msg)}
        
        />
      </button>
      <textarea
        value={message}
        onChange={handleMessageChange}
        className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-10"
        placeholder="Type a message"
      />
      {message.trim() ? (
        <button
          onClick={() => handleMessage()}
          className="text-blue-500 text-xl"
        >
          <IoSend />
        </button>
      ) : (
        <button className="text-gray-500 text-xl">
          <IoMic
          
          onClick={() => SweetAlert(Msg)}

          />
        </button>
      )}
    </div>
  );
};

export default ChatInput;
