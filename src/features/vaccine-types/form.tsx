import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { VaccineTypeSchema, vaccineTypeValues, createVaccineTypeSchema } from "./vaccine-type.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

interface VaccineTypeFormProps {
  defaultValues?: VaccineTypeSchema;
  onSubmit: (values: VaccineTypeSchema) => void;
}

export function VaccineTypeForm({ onSubmit, defaultValues }: VaccineTypeFormProps) {
  const { t } = useI18n();

  const form = useForm<VaccineTypeSchema>({
    resolver: zodResolver(createVaccineTypeSchema(t)),
    defaultValues: defaultValues || vaccineTypeValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.typeName")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.typeName")} {...field} rows={3} />
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
