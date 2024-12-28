"use client";

import React from "react";

import { SignInSchema } from "@/schemas/signin.schema";
import { SignUpSchema } from "@/schemas/signup.schema";
import { HTTP } from "@/api/http";

export type User = Omit<SignUpSchema, "password">;

interface Context {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
      const response = await HTTP.post("auth/authenticate", data);
      console.log("response: ", response);

      localStorage.setItem("@AuctionWeb:access-token", response.data);

      console.log("[AuthContext - handleSignIn] Response: ", response.data);
    } catch (error) {
      console.error("[AuthContext - handleSignIn] FAILED: ", error);
      throw error;
    }
  }

  async function handleSignUp(data: SignUpSchema) {
    try {
      const response = await HTTP.post("auth/create-account", data);

      console.log("[AuthContext - handleSignUp] Response: ", response.data);

      localStorage.setItem("@AuctionWeb:access-token", response.data);
    } catch (error) {
      console.error("[AuthContext - handleSignUp] FAILED: ", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
