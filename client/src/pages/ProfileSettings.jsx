import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword, deleteAccount } from "../redux/reducers/profileSlice";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordUpdate = () => {
    dispatch(updatePassword({ currentPassword, newPassword }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Hesabınızı silmek istediğinizden emin misiniz?")) {
      dispatch(deleteAccount()).then(() => {
        window.location.href = "/login";
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 text-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profil Ayarları</h2>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Mevcut Parola</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Mevcut parolanızı girin"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Yeni Parola</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Yeni parolanızı girin"
          />
        </div>

        <button
          onClick={handlePasswordUpdate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-md font-semibold mb-6"
        >
          Parolayı Güncelle
        </button>

        <hr className="border-gray-600 mb-6" />

        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md font-semibold"
        >
          Hesabı Sil
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
