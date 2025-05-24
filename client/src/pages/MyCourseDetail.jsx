import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const MyCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://konya-backend.onrender.com/api/courses/getCourses')
      .then(res => {
        const found = res.data.courses.find(c => c._id === id);
        setCourse(found);
      })
      .catch(err => console.error("Detay alınamadı:", err));
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-500">
        <div className="flex flex-col md:flex-row">
          
          {/* 🎥 Video */}
          <div className="w-full md:w-1/2 bg-black">
            <div className="aspect-video md:max-h-[400px] overflow-hidden">
              <video
                src={`https://konya-backend.onrender.com${course.fileUrl}`}
                controls
                className="w-full h-full object-cover rounded-t-3xl md:rounded-t-none md:rounded-l-3xl"
              />
            </div>
          </div>

          {/* 📘 Bilgi Paneli */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.category}</p>

              <div className="mt-4">
                <span className="inline-block text-lg font-semibold bg-indigo-600 text-white px-4 py-1 rounded-full shadow">
                  {course.price}₺
                </span>
              </div>

              <div className="mt-6">
                <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Açıklama</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{course.description}</p>
              </div>

                 <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
               <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-600 dark:text-gray-400 text-xl font-medium">
                  Eğitmen:
                </span>
                <Link 
                  to={`/user/${course.user}`}
                  className="text-amber-500 hover:underline text-xl font-semibold"
                >
                  {course.user}
                </Link>
              </div>
                <div>
                  <h5 className="text-gray-500 dark:text-gray-400">Kayıt Tarihi</h5>
                  <p className="text-gray-800 dark:text-white">{new Date(course.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/myCourses')}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseDetail;