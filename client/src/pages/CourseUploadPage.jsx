import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCourse } from '../redux/reducers/courseSlice';
import { useNavigate } from 'react-router-dom';

const CourseUploadPage = () => {
  const categories = ["Frontend", "Backend", "Full Stack", "Mobil Geliştirme", "Veri Bilimi"];
  const { auth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [postData, setPostData] = useState({
    user: auth.user?.username || '',
    price: "",
    title: "",
    file: null,
    description: "",
    category: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangefunc = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPostData({ ...postData, file: e.target.files[0] });
  };

  const handleImageChange = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('description', postData.description);
      formData.append('price', postData.price);
      formData.append('category', postData.category);
      formData.append('user', postData.user);
      if (postData.file) formData.append('file', postData.file);
      if (postData.image) formData.append('image', postData.image);

      await dispatch(createCourse(formData)).unwrap();

      alert("Kurs başarıyla yüklendi.");
      navigate('/courses');
    } catch (error) {
      console.error("Kurs yükleme hatası:", error);
      alert("Kurs yüklenirken hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Yeni Kurs Oluştur</h1>
            <p className="mt-1 text-sm text-gray-600">Kurs bilgilerini aşağıdaki formu doldurarak paylaşabilirsin.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Kurs Başlığı *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={onChangefunc}
                    placeholder="Örnek: React ile Modern Web Geliştirme"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Kurs Açıklaması *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={postData.description}
                    onChange={onChangefunc}
                    placeholder="Kurs içeriği hakkında detaylı bilgi verin"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={postData.price}
                    onChange={onChangefunc}
                    placeholder="0"
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Kategori *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={postData.category}
                    onChange={onChangefunc}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  >
                    <option value="">Seçiniz</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Kurs Dosyası (video, pdf vs.)
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {postData.file && (
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="font-medium">Seçilen dosya:</span> {postData.file.name}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Kurs Görseli
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {postData.image && (
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="font-medium">Seçilen görsel:</span> {postData.image.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Yükleniyor...' : 'Kursu Yayınla'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseUploadPage;