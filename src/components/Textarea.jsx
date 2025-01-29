import { useState } from "react";
import { handlePost } from "../Services/PostServices";

const Textarea = ({posts}) => {

    const [formData, setFormData] = useState({
        content:""
    });

    

    const handleChange = (e) => {

        e.preventDefault();
        const {name,value} = e.target;

        const copyFormData = {...formData}

        copyFormData[name] = value;

        setFormData(copyFormData)

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const result = await handlePost(formData);
           
      
            if(result){
                console.log("done");
                
                setFormData({
                    content:""
                });
                posts();
            }
            
      
          } catch (error) {
            
            console.log(error);
      
          }

    }



    return(
    <>
    <div className="flex flex-col bg-gray-100 p-4">
    <div className="w-full  bg-white rounded-2xl shadow-lg p-4">
        <textarea 
        name="content"
        value={formData.content}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows="4"
        placeholder="What's on Your Mind..."
        />
        <button 
        onClick={handleSubmit}
        className="w-full mt-3 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200"
        >
        Send
        </button>
    </div>
    </div>
    </>
    ) 
    

}

export default Textarea;