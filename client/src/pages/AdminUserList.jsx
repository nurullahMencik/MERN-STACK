import React, { useEffect, useState } from 'react';
import { FiTrash2, FiRefreshCw, FiUsers, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, makeAdmin } from '../redux/reducers/userSlice';

const AdminUserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        setSuccess('Kullanıcı başarıyla silindi.');
        dispatch(getUsers());
      } catch (err) {
        console.error('Silme hatası:', err);
      } finally {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiUsers className="text-indigo-600 dark:text-indigo-400" />
            Kullanıcı Listesi
          </h1>
          <button
            onClick={() => dispatch(getUsers())}
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
            placeholder="Kullanıcı ara..."
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
          {loading && !users.length ? (
            <div className="p-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-gray-600 dark:text-gray-300">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Kullanıcı bulunamadı'}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredUsers.map((user) => (
                <li key={user._id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
                  <div className="sm:col-span-5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.username}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-wrap justify-end gap-2">
                    <button
                      onClick={() => dispatch(makeAdmin({ id: user._id, isAdmin: !user.isAdmin }))}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                        user.isAdmin
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-yellow-300'
                          : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300'
                      }`}
                    >
                      {user.isAdmin ? 'Adminliği Kaldır' : 'Admin Yap'}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
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

export default AdminUserList;