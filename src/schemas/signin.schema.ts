import z from "zod";

const signInSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatório"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

export { signInSchema, DEFAULT_VALUES };
