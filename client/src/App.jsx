import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import useToken from './hooks/useToken';
import CoursesPage from './pages/CoursesPage';
import VideoPage from './pages/VideoPage';
import CourseDetail from './pages/CourseDetail';
import CartPage from './pages/CartPage';
import MyCoursesPage from './pages/myCoursePage';
import AdminCourseList from './pages/AdminCourseList';
import MyCourseDetail from './pages/MyCourseDetail';
import ErrorPage from './pages/ErrrorPage';
import CourseUploadPage from './pages/CourseUploadPage';
import MyCreatedCourses from './pages/MyCreatedCourses';
import CourseEditPage from './pages/CourseEditPage';
import FakePaymentPage from './pages/FakePaymentPage';
import ProfileSettings from './pages/ProfileSettings';
import UserCourses from './pages/UserCourses';
import Love from "./pages/Love"
import Portfoliom from './pages/portfoliom';


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
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={ token ? <VideoPage /> : <Navigate to="/auth" replace />} />

          {/* Auth işlemleri */}
          <Route path="/auth" element={!token ? <Auth /> : <Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/auth" replace state={{ initialMode: false }} />} />
          <Route path="/register" element={<Navigate to="/auth" replace state={{ initialMode: true }} />} />

            {/* Diğer route'lar */}
          <Route path="/courses" element={token ? <CoursesPage /> : <Navigate to="/auth" replace />} />
          <Route path="/course/:id" element={token ? <CourseDetail /> : <Navigate to="/auth" replace />} />
          <Route path="/mycourse/:id" element={token ? <MyCourseDetail /> : <Navigate to="/auth" replace />} />
          <Route path="/cart" element={token ? <CartPage /> : <Navigate to="/auth" replace />} />
          <Route path="/myCourses" element={token ? <MyCoursesPage /> : <Navigate to="/auth" replace />} />
          <Route path="/course-upload" element={token ? <CourseUploadPage /> : <Navigate to="/auth" replace />} />
          <Route path="/myCreatedCourses" element={token ? <MyCreatedCourses /> : <Navigate to="/auth" replace />} />
          <Route path="/myCreatedCourses/edit/:id" element={token ?<CourseEditPage />: <Navigate to="/auth" replace />} />
          <Route path="/payment" element={token ? <FakePaymentPage />: <Navigate to="/auth" replace />} />
          <Route path="/profile" element={token ? <ProfileSettings />: <Navigate to="/auth" replace />} />
          <Route path="/user/:username" element={<UserCourses />} />
          <Route path="/nurullahmencik" element={<Portfoliom/>} />
          <Route path="/a" element={<Love />} />


          

          {/* Admin sayfası sadece adminler için erişilebilir */}
          <Route path="/admin" element={isAdmin ? <AdminCourseList /> : <Navigate to="/" replace />} />

          {/* TANIMLANMAYAN YOLLAR İÇİN ERROR PAGE */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
