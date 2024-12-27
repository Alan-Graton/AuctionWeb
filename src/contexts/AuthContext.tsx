"use client";

import React from "react";

import { SignInSchema } from "@/schemas/signin.schema";
import { SignUpSchema } from "@/schemas/signup.schema";

export type User = SignUpSchema;

interface Context {
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
    } | null>
  >;
  handleSignIn: (data: SignInSchema) => Promise<void>;
  handleSignUp: (data: SignUpSchema) => Promise<void>;
}

const AuthContext = React.createContext({} as Context);

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);

  async function handleSignIn(data: SignInSchema) {
    try {
    } catch (error) {
      console.error("[AuthContext - handleSignIn] FAILED: ", error);
    }
  }

  async function handleSignUp(data: SignUpSchema) {
    try {
    } catch (error) {
      console.error("[AuthContext - handleSignUp] FAILED: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
