import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { FaCartPlus } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(course));
  };

  return (
    <div className="w-full sm:w-[300px] mx-auto p-2">
      <div className="bg-[#2D3748] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        
        {/* Görsel */}
        <div className="h-44 bg-indigo-900 flex items-center justify-center overflow-hidden">
          <img
            src={`http://localhost:5000${course.imageUrl}`}
            alt="Kurs Görseli"
            className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* İçerik */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">{course?.title}</h2>
            <p className="text-sm text-gray-300">
              {course?.description?.substring(0, 90)}...
            </p>

            <div className="flex justify-between items-center text-sm mt-2">
              <span className="bg-[#4a5568] text-indigo-300 px-3 py-1 rounded-full font-semibold">
                {course?.category}
              </span>
              <span className="font-bold text-green-400">
                {course?.price}₺
              </span>
            </div>

            <div className="text-xs text-gray-500 italic">
              Eğitmen: <span className="text-gray-400">{course?.user}</span>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/course/${course._id}`}
              className="w-full text-center py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Detayları Gör
            </Link>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#38a169] text-white font-semibold hover:bg-[#2f855a]"
            >
              <FaCartPlus /> Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
