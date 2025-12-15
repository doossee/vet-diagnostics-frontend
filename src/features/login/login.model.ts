import { z } from "zod";

export const loginValues = {
  username: "",
  password: "",
};

export const createLoginSchema = (t: any) =>
  z.object({
    username: z.string().min(1, "Введите имя пользователя"), // TODO: username
    password: z.string().min(6, t("login.passwordRequired")),
  });

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
