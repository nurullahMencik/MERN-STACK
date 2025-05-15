import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const VideoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Kurs bilgisini almak için location.state kullanıyoruz
  const { course } = location.state || {};

  if (!course) {
    return <div className="text-center text-red-600 font-semibold">Kurs bulunamadı!</div>;
  }

  const videoUrl = `http://localhost:5000${course.fileUrl}`;

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 min-h-screen p-4 sm:p-6">
      {/* Geri git butonu */}
      <div className="flex items-center w-full justify-start mb-4">
        <IoMdArrowBack
          onClick={() => navigate(-1)} // Geri gitmek için
          size={30}
          className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition"
        />
      </div>

      {/* Video Alanı */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg max-w-full w-full mb-6">
        <video
          controls
          className="w-full h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] object-cover rounded-lg shadow-md"
          src={videoUrl}
          type="video/mp4"
        ></video>
      </div>

      {/* Kurs Bilgileri */}
      <div className="bg-white p-4 sm:p-6 shadow-xl rounded-lg max-w-full w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 mb-4">{course.title}</h2>
        <p className="text-gray-700 text-base sm:text-lg mb-6">{course.description}</p>
        <div className="text-sm text-gray-500">
          <p><strong>Kategori:</strong> {course.category}</p>
          <p className="mt-2"><strong>Eklenme Tarihi:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
