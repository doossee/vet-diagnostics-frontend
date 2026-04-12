import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { MedicalSessionSchema, createMedicalSessionSchema, medicalSessionValues } from "./session.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { DatePicker } from "@/shared/components/date-picker";
import { VeterinarianSelect } from "../users/components/veterinarian-select";

interface MedicalSessionFormProps {
  defaultValues?: MedicalSessionSchema;
  onSubmit: (values: MedicalSessionSchema) => void;
}

export function MedicalSessionForm({ onSubmit, defaultValues }: MedicalSessionFormProps) {
  const { t } = useI18n();

  const form = useForm<MedicalSessionSchema>({
    resolver: zodResolver(createMedicalSessionSchema(t)),
    defaultValues: defaultValues || medicalSessionValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="veterinarianId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("users.veterinarian")}</FormLabel>
              <FormControl>
                <VeterinarianSelect placeholder={t("users.veterinarian")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("form.date")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.conclusion")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("inspections.conclusion")} {...field} rows={2} />
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
