import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { LeatherCoverSchema, createLeatherCoverSchema, leatherCoverValues } from "./leather-cover.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

interface LeatherCoverFormProps {
  defaultValues?: LeatherCoverSchema;
  onSubmit: (values: LeatherCoverSchema) => void;
}

export function LeatherCoverForm({ onSubmit, defaultValues }: LeatherCoverFormProps) {
  const { t } = useI18n();

  const form = useForm<LeatherCoverSchema>({
    resolver: zodResolver(createLeatherCoverSchema(t)),
    defaultValues: defaultValues || leatherCoverValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.leatherCoverName")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.leatherCoverName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
