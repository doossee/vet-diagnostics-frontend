import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { PROPHYLAXIS_TYPES } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { ProphylaxisItemSelect } from "../prophylaxis-items/components/prophylaxis-item-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { ProphylaxisDetailSchema, createProphylaxisDetailSchema, prophylaxisDetailValues } from "./prophylaxis-detail.model";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";

interface FormProps {
  defaultValues?: ProphylaxisDetailSchema;
  onSubmit: (values: ProphylaxisDetailSchema) => void;
}

export function ProphylaxisDetailsForm({ onSubmit, defaultValues }: FormProps) {
  const { t, locale } = useI18n();

  const form = useForm<ProphylaxisDetailSchema>({
    resolver: zodResolver(createProphylaxisDetailSchema(t)),
    defaultValues: defaultValues ? {...defaultValues, type: (defaultValues as any)?.item?.type } as any : prophylaxisDetailValues,
  });

  const type = form.watch("type" as any)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name.ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.colorName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.colorName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name.uz"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.colorName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.colorName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ObjectEntriesSelect
          name={"type" as any}
          form={form}
          locale={locale}
          object={PROPHYLAXIS_TYPES}
          label={t("inspections.specificProphylaxis")}
          placeholder={t("inspections.specificProphylaxis")}
        />
        {type && <FormField
          name={"itemId"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.regionName")}</FormLabel>
              <FormControl>
                <ProphylaxisItemSelect placeholder={t("form.regionName")} value={field.value} onChange={field.onChange} type={type} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
