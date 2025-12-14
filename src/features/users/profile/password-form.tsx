"use client";

import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { ChangePasswordSchema, changePasswordSchema, changePasswordDefaultValues } from "./password-model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface FormProps {
  onSubmit: (values: Omit<ChangePasswordSchema, 'confirmPassword'>) => Promise<void>;
}

export function PasswordForm({ onSubmit }: FormProps) {
  const { t } = useI18n();

  const form = useForm<ChangePasswordSchema>({
    defaultValues: changePasswordDefaultValues,
    resolver: zodResolver(changePasswordSchema(t))
  });

  const handleSubmit = async (values: ChangePasswordSchema) => {
    const { confirmPassword, ...body } = values;
    onSubmit(body).then(() => {
      form.reset(changePasswordDefaultValues)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          name="currentPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Текущий пароль"}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={"Текущий пароль"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={"Новый пароль"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={"confirmPassword"}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Подтвердите новый пароль"}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={"Подтвердите новый пароль"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="hidden md:block"></span>

        <Button disabled={form.formState.isSubmitting} type="submit">
          {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
        </Button>
      </form>
    </Form>
  );
}
