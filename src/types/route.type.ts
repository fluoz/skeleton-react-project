import { UserRole } from "./user.type";

export interface Route {
  path: string;
  element: React.ReactNode;
  roles?: UserRole[];
}
