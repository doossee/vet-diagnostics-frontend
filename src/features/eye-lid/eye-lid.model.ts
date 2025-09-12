import { z } from "zod";

export const eyeLidValues = {
  name: "",
};

export const createEyeLidSchema = (t: any) =>
  z.object({
    name: z.string().min(1, t("required.eyeLidNameRequired")),
  });

export type EyeLidSchema = z.infer<ReturnType<typeof createEyeLidSchema>>;
