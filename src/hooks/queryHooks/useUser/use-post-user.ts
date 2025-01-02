import { useAuth } from "@/hooks/storeHooks/use-auth-store";
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
  onError?: () => void;
}

export const usePostUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: async (payload: DataProps) =>
      new Promise<AxiosResponse<Response>>((resolve) =>
        setTimeout(() => resolve({} as AxiosResponse<Response>), 1000)
      ),
    onMutate: (data: DataProps) => {
      const previousUsers = queryClient.getQueryData(["users"]);

      // if you want to update the cache quickly without waiting for the server
      // queryClient.setQueryData(["users"], (old: any) => {
      //   return [...old, data];
      // });

      return { previousUsers };
    },
    onSuccess: (data: AxiosResponse<Response>, dataProps) => {
      dataProps.onSuccess?.(data.data);
    },
    // use param error or dataProps for creating error handling
    onError: (_, dataProps, context) => {
      toast.error("User creation failed");

      // rollback the cache if the mutation fails
      // if (context?.previousUsers) {
      //   queryClient.setQueryData(["users"], context.previousUsers);
      // }

      dataProps.onError?.();
    },
    onSettled: () => {
      // syncronously update the cache
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    createUser,
    isCreating,
  };
};
