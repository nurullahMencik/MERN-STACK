import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, resetCouponState } from '../redux/reducers/couponSlice';
import { useEffect } from 'react';

const AddCouponForm = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.coupon);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createCoupon({ code, discountPercentage: discount }));
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(resetCouponState()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Yeni Kupon Ekle</h2>
      <input
        type="text"
        placeholder="Kupon Kodu"
        value={code}
        onChange={e => setCode(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="number"
        placeholder="İndirim Oranı (%)"
        value={discount}
        onChange={e => setDiscount(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Ekleniyor...' : 'Kupon Ekle'}
      </button>
      {success && <p className="text-green-600 mt-2">Kupon başarıyla eklendi!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default AddCouponForm;
