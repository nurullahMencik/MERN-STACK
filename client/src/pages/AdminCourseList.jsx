import React, { useEffect, useState } from 'react';
import { FiTrash2, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourse } from '../redux/reducers/courseSlice';

const AdminCourseList = () => {
  const { courses, loading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Bu kursu silmek istediğinize emin misiniz?')) {
      try {
        await dispatch(deleteCourse(id)).unwrap();
        setSuccess('Kurs başarıyla silindi.');
        dispatch(getCourses());
      } catch (err) {
        setError('Kurs silinirken bir hata oluştu.',err);
      } finally {
        setTimeout(() => {
          setSuccess(null);
          setError(null);
        }, 3000);
      }
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📚</span>
            Kurs Listesi
          </h1>
          <button
            onClick={() => dispatch(getCourses())}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 flex items-center gap-2 transition-colors duration-200"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            {loading ? 'Yükleniyor...' : 'Yenile'}
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Kurs ara..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm dark:bg-red-200 dark:text-red-900">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm dark:bg-green-200 dark:text-green-900">{success}</div>
        )}

        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-600">
          {loading ? (
            <div className="p-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-4 text-center text-gray-600 dark:text-gray-300">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Kurs bulunamadı'}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredCourses.map((course) => (
                <li key={course._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{course.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>👤 {course.user}</span>
                        <span>💵 {course.price} ₺</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="flex items-center gap-2 text-sm bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:hover:bg-red-300 px-3 py-1.5 rounded-md transition-colors duration-200"
                    >
                      <FiTrash2 />
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseList;