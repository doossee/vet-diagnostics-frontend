import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { RegionSchema, createRegionSchema, regionValues } from "./regions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface RegionFormProps {
  defaultValues?: RegionSchema;
  onSubmit: (values: RegionSchema) => void;
}

export function RegionForm({ onSubmit, defaultValues }: RegionFormProps) {
  const { t } = useI18n();

  const form = useForm<RegionSchema>({
    resolver: zodResolver(createRegionSchema(t)),
    defaultValues: defaultValues || regionValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name_ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.regionName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("form.regionName")} {...field} rows={2} />
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
              <FormLabel>{t("form.regionName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("form.regionName")} {...field} rows={2} />
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
