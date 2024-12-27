"use client";

import React from "react";

import AppAuthModal from "../AppAuthModal";

import { Button } from "../ui/button";

export type AuthModalForms = "signin" | "signup";

export interface StateAuthModalControls {
  open: boolean;
  form: AuthModalForms;
}

export default function AppNavBar() {
  const [openAuthModal, setOpenAuthModal] =
    React.useState<StateAuthModalControls>({
      open: false,
      form: "signin",
    });

  function handleOpenAuthModal(form: "signin" | "signup") {
    setOpenAuthModal({ open: true, form });
  }

  return (
    <>
      <header className="w-full absolute top-0 z-10 backdrop-blur-md border-b-[1px] border-b-slate-00/100">
        <div className="p-4 flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => handleOpenAuthModal("signin")}
          >
            Entrar
          </Button>
          <Button onClick={() => handleOpenAuthModal("signup")}>
            Criar conta
          </Button>
        </div>
      </header>
      <AppAuthModal
        authModalControls={openAuthModal}
        setAuthModalControls={setOpenAuthModal}
      />
    </>
  );
}
