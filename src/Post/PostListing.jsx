import { useEffect, useState } from "react"
import { handlePostListing } from "../Services/PostServices";
import { Link } from "react-router-dom";
import { IoChatbubbleOutline, IoHeartOutline, IoRepeat, IoBookmarkOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";


const PostListing = ({data}) => {

  // const userData = useSelector((state) => state.userData);

  // console.log(userData,'postDatapostData');
  

  const [likes, setLikes] = useState(0);
  
    const [comments, setComments] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1); // Increment the like count
    };

    const handleComment = () => {
        setComments(comments + 1); // Increment the comment count
    };

  
  return (
    <>
      {data?.map((post, index) => (
         <div className="post-container w-full text-black rounded-lg p-4 border border-black-700">
         {/* Post Header */}
         <div className="post-header flex items-center justify-between mb-2">
           <div className="flex items-center gap-2">
             <img
               src={post?.user_id?.profile_pic || "https://img.freepik.com/free-vector/smiling-boy-hoodie_1308-178004.jpg?semt=ais_hybrid"}
               alt="Profile"
               className="w-10 h-10 rounded-full "
             />
             <div>
               <Link to={`/profile/${post?.user_id?.name}/${post?.user_id?._id}`} className="text-black font-semibold hover:underline">
                 {post?.user_id?.name}
               </Link>
               <span className="text-black-400 text-sm"> @{post?.user_id?.username} · 3h</span>
             </div>
           </div>
           <button className="text-black-500 hover:text-black-300">•••</button>
         </div>
   
         {/* Post Content */}
         <div className="post-content mb-2">
           <p className="text-black-300">{post?.content}</p>
         </div>
   
         {/* Engagement Buttons */}
         <div className="post-actions flex justify-between items-center text-black-500 text-sm">
           <button className="flex items-center gap-1 hover:text-blue-400">
             <IoChatbubbleOutline /> {post?.comments || 0}
           </button>
           <button className="flex items-center gap-1 hover:text-green-400">
             <IoRepeat /> {post?.retweets || 0}
           </button>
           <button className="flex items-center gap-1 hover:text-red-400">
             <IoHeartOutline /> {post?.likes || 0}
           </button>
           <button className="flex items-center gap-1 hover:text-yellow-400">
             <IoBookmarkOutline />
           </button>
         </div>
       </div>
      ))}
    </>
  );
  
}

export default PostListing
