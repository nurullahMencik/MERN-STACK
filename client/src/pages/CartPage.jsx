import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/reducers/cartSlice.js';
import { addMyCourses } from '../redux/reducers/myCoursesSlice.js';
import { toast } from 'react-toastify';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const auth = useSelector(state => state.auth.auth);
  const userId = auth?.user?._id;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePurchase = async () => {
    if (cartItems.length === 0) return;
  
    try {
      const courseIds = cartItems.map(course => course._id);
      await axios.post('http://localhost:5000/api/purchase', {
        userId,
        courses: courseIds
      });
  
      dispatch(addMyCourses(cartItems));  // Redux'a ekle
      dispatch(clearCart());
      toast.success("Satın alma başarılı ve veritabanına kaydedildi!");
    } catch (error) {
      toast.error("Satın alma başarısız!");
      console.error("Satın alma hatası:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-full sm:max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">Sepet</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Sepetiniz boş.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="border p-4 rounded-md flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.price}₺</p>
              </div>
              <button 
                onClick={() => handleRemove(item._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Kaldır
              </button>
            </div>
          ))}
          <button 
            onClick={handlePurchase} 
            className="mt-4 w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-md text-center"
          >
            Satın Al
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
