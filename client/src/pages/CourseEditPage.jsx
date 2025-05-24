import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://konya-backend.onrender.com/api/auth/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const course = res.data.course;
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Kurs bilgileri alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://konya-backend.onrender.com/api/auth/courses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Kurs başarıyla güncellendi!");
      navigate('/myCreatedCourses');
    } catch (error) {
      toast.error(error.response?.data?.message || "Güncelleme başarısız.");
    }
  };

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Kurs Güncelle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Başlık</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">Açıklama</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium mb-1">Fiyat (₺)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/my-courses')}
            className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditPage;
