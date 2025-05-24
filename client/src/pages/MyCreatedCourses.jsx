import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSave, FaTimes, FaChalkboardTeacher } from 'react-icons/fa';

const MyCreatedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    fetchCreatedCourses();
  }, []);

  const fetchCreatedCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Oturum açmanız gerekiyor");
        navigate('/login');
        return;
      }

      const response = await axios.get('https://konya-backend.onrender.com/api/auth/created-courses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(response.data.courses || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Kurslar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kursu silmek istediğinize emin misiniz?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://konya-backend.onrender.com/api/auth/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Kurs başarıyla silindi");
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Silme işlemi başarısız");
    }
  };

 

  const cancelEditing = () => {
    setEditingCourseId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://konya-backend.onrender.com/api/auth/courses/${id}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Kurs başarıyla güncellendi");
      setCourses(courses.map(course => 
        course._id === id ? { ...course, ...editFormData } : course
      ));
      setEditingCourseId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Güncelleme başarısız");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Oluşturduğum Kurslar</span>
            <span className="block text-amber-400 mt-2 text-xl font-medium">
              {courses.length} adet kurs bulunuyor
            </span>
          </h1>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
            <FaChalkboardTeacher className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-white">Henüz kurs oluşturmadınız</h3>
            <p className="mt-2 text-gray-300">
              Yeni bir kurs oluşturarak öğrencilerle buluşturabilirsiniz
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/course-upload')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Yeni Kurs Oluştur
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <div
                key={course._id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-amber-400/30"
              >
                {/* Kurs Görseli */}
                <div className="h-48 w-full overflow-hidden bg-gray-700 relative">
                  <img
                    src={course.imageUrl ? `https://konya-backend.onrender.com${course.imageUrl}` : 'https://via.placeholder.com/400x225/1F2937/FFFFFF?text=Kurs+Resmi'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x225/1F2937/FFFFFF?text=Kurs+Resmi';
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                    {course.price}₺
                  </span>
                </div>

                {/* Kurs Detayları */}
                <div className="p-6">
                  {editingCourseId === course._id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditChange}
                        placeholder="Kurs Başlığı"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      />
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        placeholder="Kurs Açıklaması"
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        placeholder="Kurs Fiyatı"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      />
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          onClick={cancelEditing}
                          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
                        >
                          <FaTimes className="mr-2" /> İptal
                        </button>
                        <button
                          onClick={() => handleUpdate(course._id)}
                          className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition"
                        >
                          <FaSave className="mr-2" /> Kaydet
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                      <p className="text-gray-300 line-clamp-3">{course.description}</p>
                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
                        >
                          <FaTrash className="mr-2" /> Sil
                        </button>
                     <button
                          onClick={() => navigate(`/myCreatedCourses/edit/${course._id}`)}
                          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                        >
                          <FaEdit className="mr-2" /> Düzenle
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedCourses;