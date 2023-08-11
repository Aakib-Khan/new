import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


export default function UpdateProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setbrand] = useState("");
    const [error, setError] = useState(false)
    const [productUpdated, setProductUpdated] = useState(false)
    const params = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        getProductDetails()
    }, [])

   const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result= await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setbrand(result.brand)
    }


    const updateProduct = async () => {
        if (!name || !price || !category || !brand) {
            setError(true)
            return false
        }

        const userID = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {

            method: 'put',
            body: JSON.stringify({ name, price, category, brand,userID }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        result = await result.json()
        setProductUpdated(true)
        setTimeout(() => {
            setProductUpdated(false)

        }, 1000);
        // console.log(name, price, category, brand)
        navigate('/')
    }


    return (
        <div className='flex flex-col h-100 mt-[8rem] justify-center items-center ' >
            <h3 className='font-bold font-mono text-[25px] my-[1rem] '>Update Product</h3>
            <div className="flex flex-col gap-3">

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Updated Name' className='border border-gray-600   font-mono px-5' />

                {error && !name && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Name Field Required</span>}

                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Updated Price' className='border border-gray-600  font-mono px-5' />

                {error && !price && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Price Field Required</span>}


                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Updated Category' className='border border-gray-600 font-mono px-5' />

                {error && !category && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Category Field Required</span>}


                <input type="text" value={brand} onChange={(e) => setbrand(e.target.value)} placeholder='Enter Updated Brand' className='border border-gray-600 font-mono px-5' />
                {error && !brand && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Brand Field Required</span>}

                <button className='bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 'onClick={updateProduct}  >Update Product</button>
                {productUpdated && <span className='font-mono self-center text-green-500 -mt-3 '>Product Updated</span>}
            </div>
        </div>
    )
}
