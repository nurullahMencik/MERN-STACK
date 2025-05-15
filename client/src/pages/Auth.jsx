import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from "../redux/reducers/authSlice.js";

const Auth = () => {
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
    setLoading(true); // yükleme başlıyor
    try {
      if (signUpVisible) {
        await dispatch(register(authData)).unwrap();
        setSignUpVisible(false); // ✅ kayıt başarılıysa giriş formuna geç
      } else {
        await dispatch(login(authData)).unwrap();
        // login başarılıysa yönlendirme yapılabilir
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
    finally {
      setLoading(false); // yükleme bitti
    }
  };
  
  return (
    <div className='w-full h-screen bg-gray-500 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50'>
      <div className='w-11/12 sm:w-1/3 bg-white p-4 rounded-lg'>
        <h1 className='text-2xl text-indigo-700 font-bold'>
          {signUpVisible ? "Kayıt Ol" : "Giriş Yap"}
        </h1>
        
        <div className='flex flex-col space-y-3 my-5'>
          {signUpVisible && (
            <input
              type="text"
              value={authData.username}
              name='username'
              onChange={onChangeFunc}
              placeholder='Kullanıcı Adı'
              className='input-style'
            />
          )}
          <input
            type="email"
            value={authData.email}
            name='email'
            onChange={onChangeFunc}
            placeholder='Email'
            className='input-style'
            required
          />
          <input
            type="password"
            value={authData.password}
            name='password'
            onChange={onChangeFunc}
            placeholder='Şifre'
            className='input-style'
            required
            minLength="6"
          />
        </div>

        <div 
          onClick={() => setSignUpVisible(!signUpVisible)} 
          className='text-red-500 text-xs cursor-pointer mb-4 hover:underline'
        >
          {signUpVisible ? "Zaten hesabınız var mı? Giriş yapın" : "Hesabınız yok mu? Kayıt olun"}
        </div>

        <button
          onClick={authFunc}
          disabled={loading}
          className={`w-full p-2 text-center ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-800'
          } text-white rounded-md transition-colors duration-300`}
        >
          {loading ? "Yükleniyor..." : signUpVisible ? "Kayıt Ol" : "Giriş Yap"}
        </button>

      </div>
    </div>
  );
};

export default Auth;
