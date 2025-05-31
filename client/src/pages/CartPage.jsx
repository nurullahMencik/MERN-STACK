import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/reducers/cartSlice.js';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiCheckCircle, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const coupons = {
  'INDIRIM10': { type: 'percentage', value: 10 },
  'SABIT25': { type: 'fixed', value: 25 },
};

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const discount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return totalPrice * (appliedCoupon.value / 100);
    } else if (appliedCoupon.type === 'fixed') {
      return Math.min(appliedCoupon.value, totalPrice);
    }
    return 0;
  })();

  const totalWithVAT = (totalPrice - discount) * 1.18;

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.success(`${title} sepetten kaldırıldı!`);
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      toast.warning("Sepetiniz boş!");
      return;
    }
    navigate("/payment");
  };
    const handleSeeAll = () => {
    navigate('/courses');
  };


  const applyCoupon = () => {
  const code = couponInput.trim().toUpperCase();

  const usedCoupons = JSON.parse(localStorage.getItem("usedCoupons") || "[]");

  if (usedCoupons.includes(code)) {
    toast.error("Bu kupon zaten kullanıldı!");
    return;
  }

  if (coupons[code]) {
    setAppliedCoupon(coupons[code]);
    toast.success(`"${code}" kuponu uygulandı!`);

    // localStorage'a kaydet
    const updatedCoupons = [...usedCoupons, code];
    localStorage.setItem("usedCoupons", JSON.stringify(updatedCoupons));
  } else {
    toast.error("Geçersiz kupon kodu!");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
            <FiArrowLeft className="mr-1" /> Geri
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            <FiShoppingCart className="mr-3" size={28} />
            Sepetim
          </h1>
          {cartItems.length > 0 && (
            <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {cartItems.length} ürün
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz boş</h3>
            <p className="text-gray-500 mb-6">Sepetinize henüz bir kurs eklemediniz.</p>
            <button
              onClick={handleSeeAll}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Kursları Keşfet
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <div key={item._id} className="p-4 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={`https://konya-backend.onrender.com${item.imageUrl}`}
                      alt={item.title}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.instructor}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-lg font-bold text-gray-900">{item.price}₺</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center">
                    <button
                      onClick={() => handleRemove(item._id, item.title)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Kupon Kodu"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  className="flex-grow border px-3 py-2 rounded-l-md text-sm focus:outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 text-sm"
                >
                  Uygula
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-green-600 text-sm">
                  Kupon: <strong>{appliedCoupon.type === 'percentage' ? `%${appliedCoupon.value}` : `${appliedCoupon.value}₺`} indirim</strong> uygulandı.
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ara Toplam:</span>
                <span className="font-medium">{totalPrice.toFixed(2)}₺</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-red-600">
                  <span>İndirim:</span>
                  <span>-{discount.toFixed(2)}₺</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">KDV (%18):</span>
                <span className="font-medium">{((totalPrice - discount) * 0.18).toFixed(2)}₺</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Toplam:</span>
                <span className="text-blue-600">{totalWithVAT.toFixed(2)}₺</span>
              </div>

              <button
                onClick={handlePurchase}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                <FiCheckCircle className="mr-2" size={20} />
                Satın Al ({cartItems.length} Kurs)
              </button>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <FiLock className="mr-2" size={14} />
                <span>Güvenli ödeme ile alışveriş yapıyorsunuz</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
