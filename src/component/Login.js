import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const redirect = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if (auth) {
          redirect('/')
        }
      },[])
    const collectData = async () => {

        let result = await fetch('http://localhost:5000/login', {

            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        result = await result.json()
        // console.log(result)
        // console.log(email,password)
        if (result.name ) {
            
            localStorage.setItem('user', JSON.stringify(result))
            redirect('/')
        }
        else{
            alert('Please Enter Correct Credentials')
        }
    }



    return (
        <div className='flex flex-col h-100 mt-[8rem] justify-center items-center ' >
            <h3 className='font-bold font-mono text-[25px] my-[1rem] hover:font-serif '>Login</h3>
            <div className="flex flex-col gap-3">


                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='border border-gray-600  font-mono px-5' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className='border border-gray-600 font-mono px-5' />
                <button className='bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 ' onClick={collectData} >Login</button>
            </div>
        </div>
    )
}
