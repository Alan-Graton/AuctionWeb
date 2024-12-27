import { StateAuthModalControls } from "../AppNavBar";

import SignInForm from "../AppAuthModal/SignInForm";
import SignUpForm from "../AppAuthModal/SignUpForm";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";

interface Props {
  authModalControls: StateAuthModalControls;
  setAuthModalControls: React.Dispatch<
    React.SetStateAction<StateAuthModalControls>
  >;
}

export default function AppAuthModal({
  authModalControls,
  setAuthModalControls,
}: Props) {
  const DIALOG_TITLE = {
    signin: "Entrar",
    signup: "Criar conta",
  };
  const DIALOG_DESCRIPTION = {
    signin: "Entre com sua conta",
    signup: "Crie uma conta para começar",
  };

  return (
    <>
      <Dialog
        open={authModalControls.open}
        onOpenChange={(open) =>
          setAuthModalControls(
            (prevState) => (prevState = { ...prevState, open }),
          )
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{DIALOG_TITLE[authModalControls.form]}</DialogTitle>
            <DialogDescription>
              {DIALOG_DESCRIPTION[authModalControls.form]}
            </DialogDescription>
          </DialogHeader>

          {authModalControls.form === "signin" ? (
            <SignInForm />
          ) : (
            <SignUpForm />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
