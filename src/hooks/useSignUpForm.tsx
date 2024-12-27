import {
  signUpSchema,
  SignUpSchema,
  DEFAULT_VALUES,
} from "@/schemas/signup.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useSignUpForm() {
  return useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_VALUES,
  });
}
