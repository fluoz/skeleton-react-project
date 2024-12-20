import { useAuth } from "@/hooks/storeHooks/use-auth-store";
import ApiClient from "@/lib/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface Payload {
  fullName: string;
  email: string;
  password: string;
}

interface Response {} // optional

interface DataProps extends Payload {
  onSuccess?: (res: Response) => void;
}

export const usePostUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: async (payload: DataProps) => {
      //   return ApiClient.post("POST_USER_URL", payload, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      return new Promise<AxiosResponse<Response>>((resolve) =>
        setTimeout(() => resolve({} as AxiosResponse<Response>), 1000)
      );
    },
    onSuccess: (data: AxiosResponse<Response>, dataProps) => {
      // if you want to invalidate a specific query
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // if you want to set the query data without fetching it
      //   queryClient.setQueryData(["user", data.data.id], data.data);
      dataProps.onSuccess?.(data.data);
    },
    // use param error or dataProps for creating error handling
    onError: () => {
      toast.error("User creation failed");
    },
  });

  return {
    createUser,
    isCreating,
  };
};
