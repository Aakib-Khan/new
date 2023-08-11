import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
const[image,setImage]=useState('') 


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate()


  const imageUpload=(event)=>{
    console.log(event.target.files[0])
    
}

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      redirect('/')
    }
  }, [])

  const collectData = async () => {
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()
    localStorage.setItem('user', JSON.stringify(result))
    redirect('/')
  }

  return (
    <div className='flex flex-col h-100 mt-[8rem] justify-center items-center ' >
      <h3 className='font-bold font-mono text-[25px] my-[1rem] '>Register</h3>
      <div className="flex flex-col gap-3">

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' className='border border-gray-600   font-mono px-5' />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'  className='border border-gray-600  font-mono px-5' />
        {/* <input type="file" placeholder='Enter Product Name' value={image}   className='border border-gray-600   font-mono px-5' /> */}

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className='border border-gray-600 font-mono px-5' />
        <button className='bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 ' onClick={collectData} >Sign Up</button>
      </div>
    </div>
  )
}
