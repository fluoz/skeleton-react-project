import { useAuth } from "@/hooks/storeHooks/use-auth-store";
import { UserRole } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { usePostUser } from "./use-post-user";
import { DUMMY_USERS } from "@/lib/constants/dummy-user";

export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: UserRole;
}

type UseUserProps = {
  withFetchAll?: boolean;
  userId?: string;
};

export const useUser = ({ userId, withFetchAll = true }: UseUserProps = {}) => {
  const { data: users, isLoading: usersIsLoading } = useQuery<User[]>({
    queryKey: ["users"],
    enabled: withFetchAll,
    queryFn: () =>
      // apiAuth(token).get("/users").then((res) => res.data?.data),
      new Promise((resolve) => setTimeout(() => resolve(DUMMY_USERS), 1000)),
  });

  const { data: currentUser, isLoading: currentUserIsLoading } = useQuery<User>(
    {
      queryKey: ["user", userId],
      enabled: !!userId,
      queryFn: () =>
        // apiAuth(token).get("/user/" + userId).then((res) => res.data?.data),
        new Promise((resolve) => setTimeout(() => resolve({} as User), 1000)),
    }
  );

  const { createUser, isCreating } = usePostUser();

  return {
    users,
    usersIsLoading,
    currentUser,
    currentUserIsLoading,
    createUser,
    isCreating,
  };
};
