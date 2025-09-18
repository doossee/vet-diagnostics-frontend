"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/i18n/routing";
import { TOAST_OPTIONS } from "@/shared/constants";
import { routes } from "@/shared/constants/routes";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { useLogin } from "@/entities/auth/services/mutations";
import { LoginSchema, createLoginSchema, loginValues } from "./login.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations();
  const { setAuthData } = useAuthData();
  const { mutateAsync, isPending } = useLogin()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: loginValues,
  });

  const handleLogin = async (values: LoginSchema) => {
    try {
      const { accessToken, refreshToken, ...user } = await mutateAsync(values);
      setAuthData(accessToken, "ACCESS_TOKEN");
      setAuthData(refreshToken, "REFRESH_TOKEN");
      setAuthData(JSON.stringify(user), "USER_DATA");

      if (user.userRole === "ADMIN") {
        router.push(routes.ANIMAL_TYPES);
      } else if (user.userRole === "VETERINARIAN") {
        router.push(routes.FARMERS);
      } else if (user.userRole === "FARMER") {
        router.push(routes.ANIMALS.INDEX);
      }
    } catch (error) {
      console.log(error);
      toast(t("login.authError"), TOAST_OPTIONS);
    }
  };

  return (
    <Card className="mx-auto max-w-[400px] w-full shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("login.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+998 XX XXX XX XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("login.password")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t("login.password")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {t(isPending ? "form.submiting" : "login.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
