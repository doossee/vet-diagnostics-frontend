"use client";

import { useForm } from "react-hook-form";
import { UserRole } from "@/shared/types";
import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/i18n/routing";
import { Input } from "@/shared/components/ui/input";
import { navLinksVariant } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { createToast } from "@/shared/hooks/use-toast";
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

      
      const firstLink = navLinksVariant[user.role as UserRole]?.[0];
      const link = firstLink.items ? firstLink.items?.[0]?.url! : firstLink?.url!

      router.push(link);
    } catch (error) {
      console.log(error);
      createToast(t("login.authError"), "WARNING");
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
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("inspections.username")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("inspections.username")} {...field} />
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
              {t(isPending ? "form.submitting" : "login.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
