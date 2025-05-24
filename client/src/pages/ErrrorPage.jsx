import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-red-400 via-red-600 to-red-800 text-white px-4">
      <h1 className="text-9xl font-extrabold mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-6 text-center max-w-xl drop-shadow-md">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-white text-red-700 font-semibold rounded-md shadow-lg hover:bg-red-100 transition"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default ErrorPage;
