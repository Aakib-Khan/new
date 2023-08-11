
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/signup')
  }
  // useEffect(()=>{
  //   const auth=localStorage.getItem('user')
  //   // if (auth) {
  //   //   redirect('/')
  //   // }
  // },[])
  return (
    <div className=''>
      <ul className={`flex  items-center ${ auth ? 'justify-between': 'justify-end' }  font-semibold text-base py-3 bg-blue-500 text-white px-2`}>



        {
          auth ? <>
            <li> <Link to='/' >Products</Link>  </li>
            <li> <Link to='/add' >Add Products</Link>  </li>
            <li> <Link to='/update' >Update</Link>  </li>
            <li> <Link to='/profile' >Profile</Link>  </li>
            <li className='' > <Link to='/signup' onClick={logout} >Logout ({JSON.parse(auth).name}) </Link>  </li>
          </>

            :
            <div className='flex'>
              <li className='px-3'> <Link to='/signup' >SignUp</Link>  </li>
              <li className='px-3'> <Link to='/login' >Login</Link>  </li>

            </div>
        }

      </ul>
    </div>
  )
}
export default Navbar