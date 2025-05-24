import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { FaCartPlus, FaStar, FaRegStar } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${course._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(course));
  };

  const rating = (Math.random() * 1 + 4).toFixed(1);
  const students = Math.floor(Math.random() * 500) + 50;

  return (
    <div
      onClick={handleNavigate}
      className="group block h-full cursor-pointer"
    >
      <div className="h-full w-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700">
          
          {/* Görsel */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-900 to-purple-800 flex items-center justify-center overflow-hidden">
            <img
              src={`https://konya-backend.onrender.com${course.imageUrl}`}
              alt={course.title}
              className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x225?text=Kurs+Gorseli';
              }}
            />
            <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
              ÇOK SATAN
            </div>
          </div>

          {/* İçerik */}
          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-1 rounded-full font-semibold">
                  {course?.category}
                </span>
                <div className="flex items-center">
                  <RiMoneyDollarCircleLine className="text-green-500 mr-1" />
                  <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                    {course?.price}₺
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                {course?.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {course?.description}
              </p>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) =>
                      i < Math.floor(rating) ? (
                        <FaStar key={i} className="text-sm" />
                      ) : (
                        <FaRegStar key={i} className="text-sm" />
                      )
                    )}
                  </div>
                  <span className="ml-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {rating}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  ({students} öğrenci)
                </span>
              </div>

              {/* Eğitmen */}
              <div className="flex items-center text-xl text-gray-500 dark:text-gray-400">
                <span>Eğitmen : </span>
                <Link
                  to={`/user/${course.user}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-amber-500 hover:underline font-semibold text-xl ml-1"
                >
                  {course.user}
                </Link>
              </div>
            </div>

            {/* Sepete Ekle Butonu */}
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                <FaCartPlus className="text-lg" />
                <span>Sepete Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
