import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit, FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourse } from '../redux/reducers/courseSlice.js';

const AdminCourseList = () => {
  const { courses, loading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Bu kursu silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(deleteCourse(id)).unwrap();
        setSuccess("Kurs başarıyla silindi.");
        dispatch(getCourses());
      } catch (err) {
        setError("Kurs silinirken bir hata oluştu.");
        console.error("Delete Error:", err);
      } finally {
        setTimeout(() => {
          setSuccess(null);
          setError(null);
        }, 3000);
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kurs Yönetim Paneli</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
              Tüm kursları görüntüleyebilir ve yönetebilirsiniz
            </p>
          </div>
          <div className="flex space-x-2 md:space-x-3">
            <button
              className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
              onClick={() => dispatch(getCourses())}
            >
              <FiRefreshCw className="mr-1 md:mr-2" /> 
              <span className="hidden md:inline">Yenile</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 md:p-4 mb-4 md:mb-6 rounded text-sm md:text-base">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 md:p-4 mb-4 md:mb-6 rounded text-sm md:text-base">
            <p>{success}</p>
          </div>
        )}

        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-4 md:mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
              placeholder="Kurs ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8 md:p-12">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center p-6 md:p-8 text-gray-500 text-sm md:text-base">
              Gösterilecek kurs bulunamadı
            </div>
          ) : isMobile ? (
            // Mobile view - Card layout
            <div className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <div key={course._id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 truncate">{course.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-3">Sahip: {course.user}</span>
                        <span className="text-green-700">{course.price} ₺</span>
                      </div>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-900 ml-2"
                      onClick={() => handleDelete(course._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop view - Table layout
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kurs Adı</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kurs Sahibi</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fiyat</th>
                    <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{course.title}</td>
                      <td className="px-4 md:px-6 py-4 truncate max-w-xs text-gray-600 text-sm">{course.user}</td>
                      <td className="px-4 md:px-6 py-4 truncate max-w-xs text-gray-600 text-sm">{course.description}</td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-green-700 text-sm">{course.price} ₺</td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(course._id)}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6 bg-white px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-sm">
          <div className="text-xs md:text-sm text-gray-700 mb-2 md:mb-0">
            Toplam <span className="font-medium">{filteredCourses.length}</span> kurs
          </div>
          <div className="flex space-x-1 md:space-x-2">
            <button className="px-2 md:px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-xs md:text-sm disabled:opacity-50">
              Önceki
            </button>
            <button className="px-2 md:px-3 py-1 rounded-md bg-indigo-600 text-white text-xs md:text-sm">1</button>
            <button className="px-2 md:px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-xs md:text-sm">Sonraki</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseList;