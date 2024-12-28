import React from "react";

import { useAuthContext } from "@/contexts/AuthContext";

import useSignUpForm from "@/hooks/useSignUpForm";

import { SignUpSchema } from "@/schemas/signup.schema";

import { AppErrorHandler } from "@/utils/AppErrorHandler.util";

import { Form, FormLabel } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function SignUpForm({ onClose }: Props) {
  const { handleSignUp } = useAuthContext();

  const [showPassword, setShowPassword] = React.useState(false);

  const form = useSignUpForm();

  async function handleOnSubmit(data: SignUpSchema) {
    try {
      await handleSignUp(data);
      toast.success("Conta criada!");
    } catch (error: any) {
      let appError: AppErrorHandler | undefined = undefined;

      if (error.response && error.response.data) {
        appError = new AppErrorHandler({ ...error.response.data });

        toast.error(appError.message);
        return;
      }
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <>
          <div>
            <FormLabel>Nome</FormLabel>
            <Input placeholder="Jonh Doe" {...form.register("name")} />
            {form.formState.errors.name && (
              <FormLabel className="text-muted-foreground text-red-400">
                {form.formState.errors.name.message}
              </FormLabel>
            )}
          </div>

          <div>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="johndoe@gmail.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <FormLabel className="text-muted-foreground text-red-400">
                {form.formState.errors.email.message}
              </FormLabel>
            )}
          </div>

          <div>
            <FormLabel>Senha</FormLabel>
            <div className="flex space-x-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                {...form.register("password")}
              />
              <Button
                className="w-14"
                variant="secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {form.formState.errors.password && (
              <FormLabel className="text-muted-foreground text-red-400">
                {form.formState.errors.password.message}
              </FormLabel>
            )}
          </div>
        </>
        <DialogFooter>
          <Button type="reset" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Entrar
            {form.formState.isSubmitting && (
              <MoonLoader className="ml-2" color="white" size={18} />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
