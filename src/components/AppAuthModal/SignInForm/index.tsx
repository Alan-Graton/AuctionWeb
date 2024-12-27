import useSignInForm from "@/hooks/useSignInForm";

import { SignInSchema } from "@/schemas/signin.schema";

import { Form, FormLabel } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInForm() {
  const form = useSignInForm();

  async function handleOnSubmit(data: SignInSchema) {
    try {
      console.log("[AppAuthModal] SignInForm data: ", data);
    } catch (error) {
      console.error(
        "[AppAuthModal - SignInForm] handleOnSubmit FAILED: ",
        error,
      );
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <>
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
            <Input
              type="password"
              placeholder="**********"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <FormLabel className="text-muted-foreground text-red-400">
                {form.formState.errors.password.message}
              </FormLabel>
            )}
          </div>
        </>
        <DialogFooter>
          <Button type="reset" variant="secondary">
            Cancelar
          </Button>
          <Button type="submit">Entrar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
