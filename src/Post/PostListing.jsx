import { useEffect, useState } from "react"
import { handlePostListing } from "../Services/PostServices";


const PostListing = ({data}) => {


  console.log(data,'postDatapostData');
  

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
        <div key={index} className="post-container w-full bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="post-header flex items-center justify-between mb-2">
            <span className="user-name text-xl font-semibold">{post?.user_id?.name}</span>
          </div>
          <div className="post-content mb-2">
            <p>{post.content}</p>
          </div>
          <div className="post-actions flex justify-between items-center">
            <button
              onClick={handleLike}
              className="like-button bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
            >
              Like {likes}
            </button>
            <button
              onClick={handleComment}
              className="comment-button bg-gray-500 text-white py-1 px-3 rounded-full hover:bg-gray-600 transition duration-200"
            >
              Comment {comments}
            </button>
          </div>
        </div>
      ))}
    </>
  );
  
}

export default PostListing
