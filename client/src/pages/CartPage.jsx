import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart,} from '../redux/reducers/cartSlice.js';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiCheckCircle , FiLock } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);



  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

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
};;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
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
              onClick={() => window.location.href = '/courses'}
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

            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Ara Toplam:</span>
                <span className="font-medium">{totalPrice}₺</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">KDV (%18):</span>
                <span className="font-medium">{(totalPrice * 0.18).toFixed(2)}₺</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Toplam:</span>
                <span className="text-blue-600">{(totalPrice * 1.18).toFixed(2)}₺</span>
              </div>

              <button
                onClick={handlePurchase}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
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