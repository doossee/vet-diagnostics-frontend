import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { DiseaseTypeSelect } from "./components/disease-type-select";
import { DiseaseTypeSchema, createDiseaseTypeSchema, diseaseTypeValues } from "./disease-type.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface DiseaseTypeFormProps {
  defaultValues?: DiseaseTypeSchema;
  onSubmit: (values: DiseaseTypeSchema) => void;
}

export function DiseaseTypeForm({ onSubmit, defaultValues }: DiseaseTypeFormProps) {
  const { t } = useI18n();

  const form = useForm<DiseaseTypeSchema>({
    resolver: zodResolver(createDiseaseTypeSchema(t)),
    defaultValues: defaultValues || diseaseTypeValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name.ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.diseaseTypeName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("inspections.diseaseTypeName")} {...field} rows={3} />
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
              <FormLabel>{t("inspections.diseaseTypeName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("inspections.diseaseTypeName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="parentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.parentDiseaseType")}</FormLabel>
              <FormControl>
                <DiseaseTypeSelect placeholder={t("inspections.parentDiseaseType")} value={field.value} onChange={field.onChange} />
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
