import z from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
};

export { signUpSchema, DEFAULT_VALUES };
