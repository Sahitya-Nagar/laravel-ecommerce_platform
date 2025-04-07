import { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Sync with localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adminInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (adminData) => {
    localStorage.setItem('adminInfo', JSON.stringify(adminData));
    setUser(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
