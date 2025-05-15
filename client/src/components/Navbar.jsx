import React, { useState } from 'react'
import { BiLogOut } from "react-icons/bi"
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../redux/reducers/modalSlice.js'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth); // auth bilgilerini aldık
  console.log(auth?.user.isAdmin) // burası true donuyor admın ıse
  const isAdmin = auth?.user?.isAdmin;  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.items)
  const [menuOpen, setMenuOpen] = useState(false)

  const logoutFunc = () => {
    localStorage.clear()
    window.location = "/auth"
  }

  return (
    <div className='bg-indigo-600 text-white'>
      <div className='flex justify-between items-center px-4 py-4 md:px-6 max-w-7xl mx-auto'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='text-2xl font-bold cursor-pointer'>
          ADEMY
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu (Desktop) */}
        <div className='hidden md:flex items-center space-x-5'>
          <input
            type="text"
            placeholder='Ara'
            className='p-2 outline-none rounded-md text-black'
          />

          

         {
          isAdmin ? <div
            onClick={() => navigate('/admin')}
            className='cursor-pointer hover:underline'
          >
            Admin
          </div>: <>
          <div
            onClick={() => dispatch(setModal(true))}
            className='border px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-900 text-center'
          >
            Kurs Yükle
          </div>

          <div
            onClick={() => navigate('/courses')}
            className='border px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-900 text-center'
          >
            Kurslar
          </div>

          <div
            onClick={() => navigate('/cart')}
            className='relative cursor-pointer hover:text-gray-300'
            title="Sepetim"
          >
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <div
            onClick={() => navigate('/myCourses')}
            className='cursor-pointer hover:underline'
          >
            Eğitimlerim
          </div>
          </>
         }
          <BiLogOut
            onClick={logoutFunc}
            size={25}
            className='cursor-pointer'
          />
        </div>
      </div>

      {/* Mobile Menü */}
      {menuOpen && (
        <div className='md:hidden px-4 py-4 space-y-4 bg-indigo-700'>
          <input
            type="text"
            placeholder='Ara'
            className='w-full p-2 rounded-md outline-none text-black'
          />

          <button
            onClick={() => dispatch(setModal(true))}
            className='w-full py-2 bg-indigo-800 rounded-md'
          >
            Kurs Yükle
          </button>

          <button
            onClick={() => {
              navigate('/courses')
              setMenuOpen(false)
            }}
            className='w-full py-2 bg-indigo-800 rounded-md'
          >
            Kurslar
          </button>

          <button
            onClick={() => {
              navigate('/cart')
              setMenuOpen(false)
            }}
            className='w-full py-2 bg-indigo-800 rounded-md'
          >
            Sepetim
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              navigate('/myCourses')
              setMenuOpen(false)
            }}
            className='w-full py-2 bg-indigo-800 rounded-md'
          >
            Eğitimlerim
          </button>

          <button
            onClick={() => {
              navigate('/admin')
              setMenuOpen(false)
            }}
            className='w-full py-2 bg-indigo-800 rounded-md'
          >
            Admin
          </button>

          <button
            onClick={logoutFunc}
            className='w-full py-2 bg-red-600 rounded-md'
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
