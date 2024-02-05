import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isStaff, setIsStaff] = useState(false);
  const [canAccept, setcanAccept] = useState(false);
  const [canReject, setcanReject] = useState(false);
  const [canInProgress, setcanInProgress] = useState(false);
  const [canClose, setcanClose] = useState(false);

  const setStaffStatus = (status) => {
    setIsStaff(status);
  };
  const setAccept = (status) => {
    setcanAccept(status);
  };
  const setReject = (status) => {
    setcanReject(status);
  };
  const setInProgress = (status) => {
    setcanInProgress(status);
  };
  const setClose = (status) => {
    setcanClose(status);
  };

  return (
    <AuthContext.Provider
      value={{
        isStaff,
        setStaffStatus,
        setAccept,
        setReject,
        setInProgress,
        setClose,
        canAccept,
        canReject,
        canInProgress,
        canClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
