import React from 'react'
import Textarea from '../components/Textarea'
import PostListing from '../Post/PostListing'

const Dashboard = ({posts,data}) => {
    
  return (
    <>
    <div className="p-4 flex-1 bg-gray-100">
              
              <Textarea  posts={posts}/>
              <PostListing data={data} />
            </div>
    </>
    )
}

export default Dashboard