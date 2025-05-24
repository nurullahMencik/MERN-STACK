import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from "../redux/reducers/authSlice.js";
import { useLocation } from 'react-router-dom';


const Auth = () => {
  const location = useLocation();


   useEffect(() => {
  if (location.state?.initialMode !== undefined) {
    setSignUpVisible(location.state.initialMode);
  }
}, [location.state]);
  const [signUpVisible, setSignUpVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const authFunc = async () => {
    setLoading(true);
    try {
      if (signUpVisible) {
        await dispatch(register(authData)).unwrap();
        setSignUpVisible(false);
      } else {
        await dispatch(login(authData)).unwrap();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Auth Form */}
      <div className="relative z-10 w-11/12 max-w-md bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          {signUpVisible ? "Kayıt Ol" : "Giriş Yap"}
        </h2>

        <form className="space-y-5">
          {signUpVisible && (
            <div>
              <label className="block text-sm text-white mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                name="username"
                value={authData.username}
                onChange={onChangeFunc}
                placeholder="Kullanıcı adınızı girin"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={authData.email}
              onChange={onChangeFunc}
              placeholder="E-posta adresiniz"
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Şifre</label>
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={onChangeFunc}
              placeholder="Şifrenizi girin"
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength="6"
            />
          </div>
        </form>

        <div
          onClick={() => setSignUpVisible(!signUpVisible)}
          className="text-sm text-indigo-300 mt-4 text-center cursor-pointer hover:underline"
        >
          {signUpVisible
            ? "Zaten hesabınız var mı? Giriş yapın"
            : "Hesabınız yok mu? Kayıt olun"}
        </div>

        <button
          onClick={authFunc}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold tracking-wide transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-indigo-600 hover:bg-indigo-800 text-white"
          }`}
        >
          {loading ? "Yükleniyor..." : signUpVisible ? "Kayıt Ol" : "Giriş Yap"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
