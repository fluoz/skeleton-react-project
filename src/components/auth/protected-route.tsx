import React from "react";
import { UserRole } from "../../types/user.type";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
  return <>{props.children}</>;
};

export default ProtectedRoute;
