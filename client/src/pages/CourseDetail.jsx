import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/getCourses`)
      .then(res => {
        const found = res.data.courses.find(c => c._id === id);
        setCourse(found);
      })
      .catch(err => console.error("Detay alınamadı:", err));
  }, [id]);

  if (!course) return <div className="min-h-screen flex items-center justify-center text-gray-600">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex flex-col-reverse sm:flex-row">
          {/* Video Alanı */}
          <div className="w-full h-64 sm:h-96 bg-gray-900 rounded-lg overflow-hidden mb-6 sm:mb-0">
            <video 
              src={`http://localhost:5000${course.fileUrl}`} 
              controls 
              className="w-full h-full object-cover"
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>

          {/* Kurs Detayları */}
          <div className="w-full sm:w-2/3 p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>

            <div className="flex items-center mt-2 mb-4">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-md font-bold">
                {course.price}₺
              </span>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{course.category}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Açıklama</h2>
              <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Eğitmen</h3>
                <p className="text-gray-900 dark:text-white">{course.user}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Kayıt Tarihi</h3>
                <p className="text-gray-900 dark:text-white">{new Date(course.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="mt-6 w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300"
            >
              ← Geri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
