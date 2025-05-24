import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/reducers/cartSlice';
import { addMyCourses } from '../redux/reducers/myCoursesSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const FakePaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  const auth = useSelector(state => state.auth.auth); // auth.user._id ile id alınır
  const userId = auth?.user?._id;

  const handleFakePayment = async (e) => {
    e.preventDefault();

    if (!cardNumber || !name || !expiry || !cvc) {
      toast.error("Tüm kart bilgilerini doldurun.");
      return;
    }

    if (!userId) {
      toast.error("Kullanıcı bilgisi alınamadı.");
      return;
    }

    try {
      const courseIds = cartItems.map(course => course._id);

       await axios.post('https://konya-backend.onrender.com/api/purchase', {
        userId,
        courses: courseIds
      });

      dispatch(addMyCourses(cartItems));
      dispatch(clearCart());

      toast.success(
        <div className="flex items-center">
          <FiCheckCircle className="mr-2" size={20} />
          <span>Satın alma başarılı! Kurslar eklendi.</span>
        </div>
      );

      navigate('/myCourses');
    } catch (error) {
      console.error("Satın alma hatası:", error);
      toast.error("Satın alma işlemi başarısız.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleFakePayment}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiCreditCard className="mr-2" /> Ödeme Bilgileri (Yalancı)
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kart Numarası</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kart Üzerindeki İsim</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad Soyad"
          />
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Son Kullanma</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="AA/YY"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
        >
          Satın Al ({cartItems.length} Kurs)
        </button>
      </form>
    </div>
  );
};

export default FakePaymentPage;
