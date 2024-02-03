import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isStaff, setIsStaff] = useState(false);

  const setStaffStatus = (status) => {
    console.log(status);
    setIsStaff(status);
  };

  return (
    <AuthContext.Provider value={{ isStaff, setStaffStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
