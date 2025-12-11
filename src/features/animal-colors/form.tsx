import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { AnimalColorSchema, animalColorValues, createAnimalColorSchema } from "./animal-color.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface AnimalColorFormProps {
  defaultValues?: AnimalColorSchema;
  onSubmit: (values: AnimalColorSchema) => void;
}

export function AnimalColorForm({ onSubmit, defaultValues }: AnimalColorFormProps) {
  const { t } = useI18n();

  const form = useForm<AnimalColorSchema>({
    resolver: zodResolver(createAnimalColorSchema(t)),
    defaultValues: defaultValues || animalColorValues,
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
                <Input placeholder={t("management.colorName")} {...field} />
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
                <Input placeholder={t("management.colorName")} {...field} />
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
