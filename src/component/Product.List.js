import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'



export default function ProductList() {
    const [prodcuts, setProducts] = useState([])

    async function getProducts() {
        let result = await fetch('http://localhost:5000/products')
        result = await result.json()
        // console.log(result)
        setProducts(result)
    }

    useEffect(() => {
        getProducts()
    }, [])


    const deleteProduct = async (id) => {
        // console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete'
        })
        result = await result.json()
        if (result) {
            getProducts()
            // alert('Product Deleted')

        }
    }
    const searchHandle = async () => {

        let key = event.target.value
        if (key) {

            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json()

            if (result) {
                setProducts(result)
            }

        } else {
            getProducts()
        }
    }

    return (
        <div className="">
                <div className='text-center mt-[50px] w- '>
                    <h3 className='my-10 font-bold font-mono text-[30px] relative right-40 ' >Product List</h3>
                    <input type="text " placeholder='Search Products' onChange={searchHandle} className='relative right-40 mb-10 border pl-5 py-1 font-mono rounded-full' />
                    <ul className='m-0 w-[1200px] flex justify-around font-mono font-bold text-[20px] text-red-500 ' >
                        <li className='border w-[150px] inline-block ' >S. No.</li>
                        <li className='border w-[400px] inline-block ' >Product Name</li>
                        <li className='border w-[150px] inline-block ' >Price</li>
                        <li className='border w-[150px] inline-block ' >Brand</li>
                        <li className='border w-[150px] inline-block ' >Category</li>
                        <li className=' w-[150px] border inline-block  ' >Operation</li>

                    </ul>
                    {
                    prodcuts.length>0 ? prodcuts.map((item, index) =>
                            <ul key={item._id} className='m-0 w-[1200px] flex justify-around items-center font-mono py-2 text-[17px]' >
                                <li className='inline-block w-[150px] border   ' >{index + 1}</li>
                                <li className='inline-block w-[400px] border  ' >{item.name}</li>
                                <li className='inline-block w-[150px] border   ' >{item.price}</li>
                                <li className='inline-block w-[150px] border   ' >{item.brand}</li>
                                <li className='inline-block w-[150px] border   ' >{item.category}</li>
                                <li>
                                    <div className="">

                                        <button onClick={() => deleteProduct(item._id)} className='inline-block rounded-full w-[150px] border bg-blue-500 text-white' >Delete </button>
                                        <li><Link className='inline-block w-[150px] border bg-blue-500  rounded-full text-white' to={`/update/${item._id}`} >Update </Link></li>
                                    </div>

                                </li>

                            </ul>
                        ) : <h3>No Result Found</h3>

                    }


                </div>

        </div>
    )
}




{/* <table className="border-separate border-spacing-2 border border-slate-500 table-auto">
    <thead>
        <tr>
            <th className="border border-slate-600 ...">State</th>
            <th className="border border-slate-600 ...">City</th>
            </tr>
            </thead>
    <tbody>
        <tr>
            <td className="border border-slate-700 ...">Indiana</td>
            <td className="border border-slate-700 ...">Indianapolis</td>
        </tr>
        <tr>
            <td className="border border-slate-700 ...">Ohio</td>
            <td className="border border-slate-700 ...">Columbus</td>
        </tr>
        <tr>
            <td className="border border-slate-700 ...">Michigan</td>
            <td className="border border-slate-700 ...">Detroit</td>
        </tr>
    </tbody>
</table> */}