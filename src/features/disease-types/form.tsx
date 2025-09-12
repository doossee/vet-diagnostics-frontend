import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DiseaseTypeSchema, createDiseaseTypeSchema, diseaseTypeValues } from "./disease-type.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

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
            {t(form.formState.isSubmitting ? "form.submiting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
