import {
  signInSchema,
  SignInSchema,
  DEFAULT_VALUES,
} from "@/schemas/signin.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useSignInForm() {
  return useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: DEFAULT_VALUES,
  });
}
