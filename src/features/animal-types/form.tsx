import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { AnimalTypeSchema, animalTypeValues, createAnimalTypeSchema } from "./animal-type.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

interface AnimalTypeFormProps {
  defaultValues: AnimalTypeSchema | undefined;
  onSubmit: (values: AnimalTypeSchema) => void;
}

export function AnimalTypeForm({ onSubmit, defaultValues }: AnimalTypeFormProps) {
  const { t } = useI18n();

  const form = useForm<AnimalTypeSchema>({
    resolver: zodResolver(createAnimalTypeSchema(t)),
    defaultValues: defaultValues || animalTypeValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("animalTypes.name")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("animalTypes.name")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {form.formState.isSubmitting ? t("form.submitting") : t("form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
