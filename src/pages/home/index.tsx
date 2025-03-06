import { Button } from "@/components/ui/button";
import { UserSchema, UserSchemaType } from "@/validations/user.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/queryHooks/useUser";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/form/text-input";
import { PasswordInput } from "@/components/form/password-input";
import toast from "react-hot-toast";
import { RenderIf } from "@/components/utils/render-if";
import EachUtils from "@/components/utils/each-utils";

const Home = () => {
  const { users, usersIsLoading, createUser, isCreating } = useUser();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: UserSchemaType) => {
    createUser({
      ...data,
      onSuccess: (res) => {
        toast.success("User created successfully");
      },
    });
  };
  return (
    <div className="max-w-xl mt-16 mx-auto">
      <RenderIf condition={usersIsLoading}>
        <p>Loading...</p>
      </RenderIf>
      <RenderIf condition={!usersIsLoading}>
        {/* form example  */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <TextInput
                form={form}
                name="fullName"
                label="fullName"
                placeholder="fullName"
              />
              <TextInput
                form={form}
                name="email"
                label="Email"
                placeholder="Email"
              />
              <PasswordInput form={form} name="password" label="Password" />
              <PasswordInput
                form={form}
                name="confirmPassword"
                label="Confirm Password"
              />
            </div>

            <Button disabled={isCreating} className="w-full mt-6">
              test
            </Button>
          </form>
        </Form>
        <div className="space-y-2 mt-6">
          <EachUtils
            items={users || []}
            renderItem={(user) => <p>{user.name}</p>}
          />
        </div>
      </RenderIf>
    </div>
  );
};

export default Home;
