import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import man from '../Assets/man.png'

 function Profile() {
  const [postImage, setPostImage] = useState({ myFile : ''  })
  const collectData = async () => {
    

    let result = await fetch('http://localhost:5000/profile', {

      method: 'post',
      body: (
    createPost(postImage)

      ),
      // headers: {
      //   'Content-Type': 'application/json'
      // }

    })
    // result = await result.json()
    // const key=event.target.files[0]
    // setImage(key)
console.log(result)
    


  }

  const createPost=async(newImage)=>{
    try {
      await axios.post('http://localhost:5000/profile',newImage)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload=async(event)=>{
    const file=event.target.files[0] 
    const base64= await convertToBase64(file)
    setPostImage({...postImage,myFile:base64})
    // console.log(base64)
  }
  const handleSubmit=async()=>{
    console.log('File Uploaded')
  }

  return (
    <div className='flex flex-col h-100 mt-[8rem] justify-center items-center ' >
      <h3 className='font-bold font-mono text-[25px] my-[1rem] '>Profile Section</h3>
      <form className="flex flex-col gap-3" onSubmit={collectData} >

        <label htmlFor="file-upload">
          <img src={ postImage.myFile || man} className='w-24' alt="" />
        </label>

        <input type="file"
          placeholder='Enter Product Name'
          lable="Image"
          name='myFile'
          id='file-upload'
          accept='.jpeg , .png , .jpg'
          hidden
          onChange={(event)=>handleFileUpload(event)}
          className='border border-gray-600   font-mono px-5' />

        {/* //   <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price' className='border border-gray-600  font-mono px-5' /> */}




        {/* //   <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Product Category' className='border border-gray-600 font-mono px-5' /> */}




        {/* //   <input type="text" value={brand} onChange={(e) => setbrand(e.target.value)} placeholder='Enter Product Brand' className='border border-gray-600 font-mono px-5' /> */}


        <button className='bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 ' onClick={handleSubmit} >Update Profile</button>
        {/* {productAdded && <span className='font-mono self-center text-green-500 -mt-3 '>Product Added</span>} */}
      </form>
    </div>
  )
}
export default Profile 
