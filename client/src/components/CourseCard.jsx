import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { FaCartPlus, FaStar, FaRegStar, FaFire } from 'react-icons/fa';
import { RiMoneyDollarCircleLine, RiTimeLine } from 'react-icons/ri';
import { IoMdPerson } from 'react-icons/io';
import { BiCategoryAlt } from 'react-icons/bi';

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

  const handleInstructorClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${course.user}`);
  };

  const rating = (Math.random() * 1 + 4).toFixed(1);
  const students = Math.floor(Math.random() * 500) + 50;
  const duration = `${Math.floor(Math.random() * 5) + 1} saat ${Math.floor(Math.random() * 50) + 10} dakika`;

  return (
    <div
      onClick={handleNavigate}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800"
    >
      {/* Hot/Badge Ribbon */}
      <div className="absolute -right-8 -top-2 z-10 w-32 rotate-45 transform bg-gradient-to-r from-pink-500 to-rose-500 py-1 text-center text-xs font-bold uppercase text-white shadow-lg">
        <FaFire className="mr-1 inline" /> Popüler
      </div>
      
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
        <img
          src={`https://konya-backend.onrender.com${course.imageUrl}`}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/random/400x225/?course,education';
          }}
        />
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 z-20 flex w-full items-center justify-between p-3 text-white">
          <div className="flex items-center rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
            <RiTimeLine className="mr-1" />
            <span className="text-xs font-medium">{duration}</span>
          </div>
          <div className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold shadow-md">
            {course.level || 'Orta Seviye'}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category & Price */}
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
            <BiCategoryAlt className="mr-1" />
            {course?.category}
          </span>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-400 line-through dark:text-gray-500">
              {course?.price * 1.5}₺
            </span>
            <span className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-900/50 dark:text-green-300">
              <RiMoneyDollarCircleLine className="mr-1" />
              {course?.price}₺
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-4 flex-1">
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {course?.title}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
            {course?.description}
          </p>
        </div>

        {/* Rating & Students */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 flex">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(rating) ? (
                  <FaStar key={i} className="text-amber-400" />
                ) : (
                  <FaRegStar key={i} className="text-amber-400" />
                )
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {rating}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <IoMdPerson className="mr-1" />
            <span>{students.toLocaleString()}</span>
          </div>
        </div>

        {/* Instructor - Tüm alan tıklanabilir yapıldı */}
        <div 
          onClick={handleInstructorClick}
          className="mb-4 flex cursor-pointer items-center text-sm transition-transform hover:scale-[1.02]"
        >
          <div className="mr-3 h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-md">
            <img 
              src={`https://ui-avatars.com/api/?name=${course.user}&background=random`} 
              alt={course.user}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Eğitmen</p>
            <span className="font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              {course.user}
            </span>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="mt-auto"></div>

        {/* Add to Cart Button */}
        <div className="pt-4">
          <button
            onClick={handleAddToCart}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-center">
              <FaCartPlus className="mr-2" />
              <span>Sepete Ekle</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;