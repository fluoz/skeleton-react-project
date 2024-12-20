import React from "react";
import QueryProvider from "./query-provider";
import ToastProvider from "./toast-provider";
import { HelmetProvider } from "react-helmet-async";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <ToastProvider />
        {props.children}
      </QueryProvider>
    </HelmetProvider>
  );
};

export default Providers;
