import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
// import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";
import { PROPHYLAXIS_TYPES } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ProphylaxisItemSchema, createProphylaxisItemSchema, prophylaxisItemValues } from "./prophylaxis-item.model";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";

interface FormProps {
  defaultValues?: ProphylaxisItemSchema;
  onSubmit: (values: ProphylaxisItemSchema) => void;
}

export function ProphylaxisItemsForm({ onSubmit, defaultValues }: FormProps) {
  const { t, locale } = useI18n();

  const form = useForm<ProphylaxisItemSchema>({
    resolver: zodResolver(createProphylaxisItemSchema(t)),
    defaultValues: defaultValues || prophylaxisItemValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name_ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ t("inspections.itemName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={ t("inspections.itemName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name_uz"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ t("inspections.itemName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={ t("inspections.itemName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ObjectEntriesSelect
          name="type"
          form={form}
          locale={locale}
          object={PROPHYLAXIS_TYPES}
          label={t("inspections.specificProphylaxis")}
          placeholder={t("inspections.specificProphylaxis")}
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
