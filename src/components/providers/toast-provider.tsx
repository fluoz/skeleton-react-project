import React from "react";
import { DefaultToastOptions, Toaster } from "react-hot-toast";

const ToastProvider = () => {
  const toastOptions: DefaultToastOptions = {
    duration: 3000,
    className: "text-sm",
  };
  return <Toaster toastOptions={toastOptions} />;
};

export default ToastProvider;
