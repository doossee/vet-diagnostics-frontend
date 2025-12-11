import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { UrineColorSchema, createUrineColorSchema, urineColorValues } from "./urine-color";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface UrineColorFormProps {
  defaultValues?: UrineColorSchema;
  onSubmit: (values: UrineColorSchema) => void;
}

export function UrineColorForm({ onSubmit, defaultValues }: UrineColorFormProps) {
  const { t } = useI18n();

  const form = useForm<UrineColorSchema>({
    resolver: zodResolver(createUrineColorSchema(t)),
    defaultValues: defaultValues || urineColorValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name_ru"
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
          name="name_uz"
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
        <FormField
          name="animalTypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.colorName")}</FormLabel>
              <FormControl>
                <AnimalTypeSelect placeholder={t("animals.animalType")} value={field.value} onChange={field.onChange} />
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
