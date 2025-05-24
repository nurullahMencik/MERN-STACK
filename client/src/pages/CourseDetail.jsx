import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../redux/reducers/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://konya-backend.onrender.com/api/courses/getCourses`)
      .then(res => {
        const found = res.data.courses.find(c => c._id === id);
        setCourse(found);
      })
      .catch(err => console.error("Detay alınamadı:", err));
  }, [id]);

  const handleAddToCart = () => {
   dispatch(addToCart(course));
  };

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          
          {/* Kurs Görseli */}
            <div className="aspect-video md:max-h-[400px] overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
              <img 
                src={`https://konya-backend.onrender.com${course.imageUrl}`} 
                alt={course.title}
                className="w-full h-full object-contain"
              />
            </div>

          {/* Detaylar */}
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
                <div>
                  <h5 className="text-gray-500 dark:text-gray-400 text-xl">Eğitmen</h5>
                  <Link 
                    to={`/user/${course.user}`} 
                    className="text-amber-500 hover:underline font-semibold text-xl"
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

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                <ShoppingCart className="w-4 h-4" />
                Sepete Ekle
              </button>

              <button
                onClick={() => navigate('/courses')}
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                ← Geri
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
