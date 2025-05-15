import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    // Array içinde mi yoksa direkt obje mi kontrolü
    const extractedToken = authData?.[0]?.token || authData?.token;
    setToken(extractedToken || null);
  }, []);

  return { token };
};

export default useToken;