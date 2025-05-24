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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📚 Kurs Listesi</h1>
            <p className="text-sm text-gray-600">Tüm kursları buradan yönetebilirsin.</p>
          </div>
          <button
            onClick={() => dispatch(getCourses())}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm transition"
          >
            <FiRefreshCw />
            Yenile
          </button>
        </div>

        {/* Geri Bildirim */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg shadow-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg shadow-sm">
            {success}
          </div>
        )}

        {/* Arama */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Kurs ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Kurs Kartları Satır Satır */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Gösterilecek kurs bulunamadı.</div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center md:items-start gap-4 hover:shadow-lg transition-all duration-300"
              >

                {/* Bilgiler */}
                <div className="flex-1 space-y-1 w-full">
                  <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>👤 {course.user}</span>
                    <span>💵 {course.price} ₺</span>
                  </div>
                </div>

                {/* Sil Butonu */}
                <button
                  onClick={() => handleDelete(course._id)}
                  className="mt-2 md:mt-0 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <FiTrash2 />
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseList;
