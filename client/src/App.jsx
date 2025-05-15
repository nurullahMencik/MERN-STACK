import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import useToken from './hooks/useToken';
import CoursesPage from './pages/CoursesPage';
import VideoPage from './pages/VideoPage';
import CourseDetail from './pages/CourseDetail';
import CartPage from './pages/CartPage';
import MyCoursesPage from './pages/myCoursePage';
import AdminCourseList from './pages/AdminCourseList';

function App() {
  const { token } = useToken();
  const { auth } = useSelector((state) => state.auth); // auth bilgilerini aldık
  const { isOpen } = useSelector((state) => state.modal);
  console.log(auth?.user.isAdmin) // burası true donuyor admın ıse
  const isAdmin = auth?.user?.isAdmin;  // Bu, doğru bir boolean kontrolü sağlar


  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {isOpen && <Modal />}
        <Routes>
          {/* Home ve Auth Sayfaları */}
          <Route path="/" element={token ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="/video/:id" element={<VideoPage />} />

          {/* Auth işlemleri */}
          <Route path="/auth" element={!token ? <Auth /> : <Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/auth" replace state={{ initialMode: false }} />} />
          <Route path="/register" element={<Navigate to="/auth" replace state={{ initialMode: true }} />} />

          {/* Diğer route'lar */}
          <Route path="/courses" element={token ? <CoursesPage /> : <Navigate to="/auth" replace />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/cart" element={token ? <CartPage /> : <Navigate to="/auth" replace />} />
          <Route path="/myCourses" element={token ? <MyCoursesPage /> : <Navigate to="/auth" replace />} />

          {/* Admin sayfası sadece adminler için erişilebilir */}
          <Route path="/admin" element={isAdmin ? <AdminCourseList /> : <Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
