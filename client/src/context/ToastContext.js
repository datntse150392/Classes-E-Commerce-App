import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast as notify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === "success") {
        notify.success(toastMessage.message);
      } else if (toastMessage.type === "error") {
        notify.error(toastMessage.message);
      }
      setToastMessage(null);
    }
  }, [toastMessage]);

  return (
    <ToastContext.Provider value={{ setToastMessage }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
