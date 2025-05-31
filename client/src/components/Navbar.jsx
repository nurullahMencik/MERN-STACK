import React, { useState } from 'react';
import {
  BiLogOut,
  BiUser,
  BiBookAlt,
  BiCart,
  BiPlusCircle,
  BiListUl,
  BiLogIn,
  BiUserPlus,
} from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth);
  const isAdmin = auth?.user?.isAdmin;
  const cartItems = useSelector((state) => state.cart.items);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const username = auth?.user?.username || '';
  const profileLetter = username.charAt(0).toUpperCase();

  const logoutFunc = () => {
    localStorage.clear();
    window.location = '/auth';
  };

  const menuItems = [
    {
      title: 'Admin Courses',
      path: '/admin/courses',
      icon: <BiUser />,
      visible: isAdmin,
    },
    {
      title: 'Admin Users',
      path: '/admin/users',
      icon: <BiUser />,
      visible: isAdmin,
    },
    {
      title: 'Kurs Yükle',
      path: '/course-upload',
      icon: <BiPlusCircle />,
      visible: !isAdmin,
    },
    {
      title: 'Tüm Kurslar',
      path: '/courses',
      icon: <BiBookAlt />,
      visible: !isAdmin,
    },
    {
      title: 'Oluşturduğum Kurslar',
      path: '/myCreatedCourses',
      icon: <BiListUl />,
      visible: !isAdmin,
    },
    {
      title: 'Satın Aldıklarım',
      path: '/myCourses',
      icon: <BiBookAlt />,
      visible: !isAdmin,
    },
    {
      title: 'Sepetim',
      path: '/cart',
      icon: <BiCart />,
      badge: cartItems.length,
      visible: !isAdmin,
    },
  ];

  return (
    <>
      {/* Mobil Header */}
      <div className="md:hidden bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
          ADEMY
        </div>
        <div className="flex items-center space-x-3">
          {auth ? (
            <div
              onClick={() => navigate('/profile')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-indigo-700 font-bold cursor-pointer"
            >
              {profileLetter}
            </div>
          ) : null}
          <button onClick={() => setSidebarOpen(true)}>
            <BiListUl size={24} />
          </button>
        </div>
      </div>

      {/* Masaüstü Header */}
      <div className="hidden md:flex bg-indigo-600 text-white p-4 items-center justify-between">
        <div onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
          ADEMY
        </div>
        <div className="flex items-center gap-4">
          {menuItems.map(
            (item) =>
              item.visible && (
                <div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center cursor-pointer hover:bg-indigo-700 px-3 py-2 rounded-md"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                  {item.badge > 0 && (
                    <span className="ml-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )
          )}
        </div>
        <div className="flex items-center gap-4">
          {!auth ? (
            <>
              <div
                onClick={() => navigate('/auth', { state: { initialMode: true } })}
                className="flex items-center cursor-pointer hover:bg-indigo-700 px-3 py-2 rounded-md"
              >
                <BiUserPlus className="mr-2" />
                Kayıt Ol
              </div>
              <div
                onClick={() => navigate('/auth', { state: { initialMode: false } })}
                className="flex items-center cursor-pointer hover:bg-indigo-700 px-3 py-2 rounded-md"
              >
                <BiLogIn className="mr-2" />
                Giriş Yap
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => navigate('/profile')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-indigo-700 font-bold cursor-pointer"
              >
                {profileLetter}
              </div>
              <div
                onClick={logoutFunc}
                className="flex items-center cursor-pointer hover:bg-indigo-700 px-3 py-2 rounded-md"
              >
                <BiLogOut className="mr-2" />
                Çıkış Yap
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobil Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-72 max-w-full bg-indigo-700 text-white h-full flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-indigo-600">
              <div className="text-xl font-bold">Menü</div>
              <button onClick={() => setSidebarOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {auth && (
              <div
                onClick={() => {
                  navigate('/profile');
                  setSidebarOpen(false);
                }}
                className="w-20 h-20 my-4 mx-auto flex items-center justify-center rounded-full bg-white text-indigo-700 text-3xl font-bold cursor-pointer"
              >
                {profileLetter}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {menuItems.map(
                (item) =>
                  item.visible && (
                    <div
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className="flex items-center p-3 hover:bg-indigo-600 rounded-md cursor-pointer"
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.title}
                      {item.badge > 0 && (
                        <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )
              )}

              {!auth && (
                <>
                  <div
                    onClick={() => {
                      navigate('/auth', { state: { initialMode: true } });
                      setSidebarOpen(false);
                    }}
                    className="flex items-center p-3 hover:bg-indigo-600 rounded-md cursor-pointer"
                  >
                    <BiUserPlus className="mr-2" />
                    Kayıt Ol
                  </div>
                  <div
                    onClick={() => {
                      navigate('/auth', { state: { initialMode: false } });
                      setSidebarOpen(false);
                    }}
                    className="flex items-center p-3 hover:bg-indigo-600 rounded-md cursor-pointer"
                  >
                    <BiLogIn className="mr-2" />
                    Giriş Yap
                  </div>
                </>
              )}
            </div>

            {auth && (
              <div
                onClick={logoutFunc}
                className="p-4 border-t border-indigo-600 flex items-center hover:bg-indigo-600 cursor-pointer"
              >
                <BiLogOut className="mr-3" />
                Çıkış Yap
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
