import React, { useState } from 'react'

export default function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setbrand] = useState("");
  const [error, setError] = useState(false)
  const [productAdded, setProductAdded] = useState(false)
  // const addProduct = async () => {
  //     console.log(userID)
  //     let result=
  // }
  const addProduct = async () => {
    if (!name || !price || !category || !brand) {
      setError(true)
      return false
    }

    const userID = JSON.parse(localStorage.getItem('user'))._id;

    let result = await fetch('http://localhost:5000/add-product', {
    
      method: 'post',
      body: JSON.stringify({ name, price, category, userID, brand }),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    result = await result.json()
    setProductAdded(true)
    setTimeout(() => {
    setProductAdded(false)

    }, 1000);
    setName('')
    setPrice('')
    setCategory('')
    setbrand('')
  }


  return (
    <div className='flex flex-col h-100 mt-[8rem] justify-center items-center ' >
      <h3 className='font-bold font-mono text-[25px] my-[1rem] '>Add New Product</h3>
      <div className="flex flex-col gap-3">

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name' className='border border-gray-600   font-mono px-5' />

        {error && !name && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Name Field Required</span>}

        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price' className='border border-gray-600  font-mono px-5' />

        {error && !price && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Price Field Required</span>}


        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Product Category' className='border border-gray-600 font-mono px-5' />

        {error && !category && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Category Field Required</span>}


        <input type="text" value={brand} onChange={(e) => setbrand(e.target.value)} placeholder='Enter Product Brand' className='border border-gray-600 font-mono px-5' />
        {error && !brand && <span className='font-mono text-red-400 block -mt-[10px] ml-[10px] -mb-[10px] ' >Brand Field Required</span>}

        <button className='bg-blue-500 px-2 py-1 text-white font-mono rounded-lg my-3 hover:bg-blue-700 ' onClick={addProduct} >Add Product</button>
        {productAdded && <span className='font-mono self-center text-green-500 -mt-3 '>Product Added</span>}
      </div>
    </div>
  )
}
