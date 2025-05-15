import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addMyCourses } from '../redux/reducers/myCoursesSlice.js';
import { toast } from 'react-toastify';
import { logout } from '../redux/reducers/authSlice';

const MyCoursesPage = () => {
  // Kullanıcı bilgilerini auth objesinden alıyoruz
  const { auth } = useSelector(state => state.auth);
  const myCourses = useSelector(state => state.myCourses.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCourseDetail = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!auth?.user?._id || !auth?.token) {
        toast.error('Önce giriş yapmalısınız');
        navigate('/login');
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/my-courses`, 
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );
        
        dispatch(addMyCourses(response.data));
      } catch (error) {
        console.error('Kurslar alınamadı:', error);
        
        if (error.response?.status === 401) {
          toast.error('Oturum süresi doldu, lütfen tekrar giriş yapın');
          dispatch(logout());
          navigate('/login');
        } else if (error.response?.status === 404) {
          // Endpoint bulunamadı hatası
          toast.error('Kurs bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
        } else {
          toast.error('Kurslar yüklenirken bir hata oluştu');
        }
      }
    };
  
    fetchMyCourses();
  }, [dispatch, navigate, auth]);

  // Kullanıcı adını göstermek için
  const username = auth?.user?.username || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            {username}'in Eğitimleri
          </h2>
          <p className="mt-3 text-xl text-gray-300">
            Satın aldığınız kurslarınız
          </p>
        </div>

        {/* Courses List */}
        {myCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-800 mb-6">
              <svg
                className="h-12 w-12 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">
              Henüz kurs satın almadınız
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Eğitimlerim sayfasında satın aldığınız kurslar görüntülenecektir.
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Kursları Keşfet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {myCourses.map(course => (
              <div 
                key={course._id}
                className="group flex flex-col sm:flex-row border border-gray-700 rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-750 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {/* Course Image */}
                <div className="sm:w-1/4 h-48 sm:h-auto relative overflow-hidden">
                  <img 
                    src={`http://localhost:5000${course.imageUrl}`} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Course Details */}
                <div className="sm:w-3/4 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="mt-3 text-gray-300 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 border-2 border-gray-800"></div>
                        <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-gray-800"></div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {course.students || 0} öğrenci
                      </span>
                    </div>
                    
                    <button
                      onClick={() => goToCourseDetail(course._id)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center w-full sm:w-auto"
                    >
                      Devam Et
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
