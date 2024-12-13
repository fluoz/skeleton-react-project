import React from "react";
import QueryProvider from "./query-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return <QueryProvider>{props.children}</QueryProvider>;
};

export default Providers;
