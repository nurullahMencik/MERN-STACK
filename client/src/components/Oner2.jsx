import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Oner2 = () => {
  const auth = useSelector((state) => state.auth.auth);
  const username = auth?.user?.username || '';
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (username) {
          response = await axios.get(`https://konya-backend.onrender.com/api/simple-ai/${username}`);
          if (!response.data || response.data.length === 0) {
            response = await axios.get(`https://konya-backend.onrender.com/api/simple-ai`);
          }
        } else {
          response = await axios.get(`https://konya-backend.onrender.com/api/simple-ai`);
        }
        setCourses(response.data || []);
      } catch (err) {
        setError('Öneriler yüklenirken hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [username]);

  const scrollLeft = () => {
    const container = document.getElementById('courses-container');
    if (container) {
      container.scrollLeft -= 320;
      setScrollPosition(container.scrollLeft);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('courses-container');
    if (container) {
      container.scrollLeft += 320;
      setScrollPosition(container.scrollLeft);
    }
  };

  const handleSeeAll = () => {
    navigate('/courses');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: 'auto', position: 'relative' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">
          {username ? 'Senin İçin Önerilen Kurslar' : 'Popüler Kurslar'}
        </h3>
        {courses.length > 0 && (
          <button
            onClick={handleSeeAll}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            Tümünü Gör
            <FaChevronRight className="ml-1" size={14} />
          </button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="relative">
        {loading ? (
          <div className="flex overflow-x-auto gap-6 py-4 px-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] h-[180px] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              style={{ display: scrollPosition <= 0 ? 'none' : 'block' }}
            >
              <FaChevronLeft className="text-gray-800" />
            </button>

            <div
              id="courses-container"
              className="flex overflow-x-auto scroll-smooth gap-6 py-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {courses.map((course) => (
                <div key={course._id} className="flex-shrink-0 w-[300px]">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              style={{
                display:
                  document.getElementById('courses-container') &&
                  scrollPosition >=
                    document.getElementById('courses-container')?.scrollWidth -
                    document.getElementById('courses-container')?.clientWidth
                    ? 'none'
                    : 'block',
              }}
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          </>
        ) : (
          <p>Henüz önerilecek kurs bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Oner2;
