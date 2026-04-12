import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { AnimalTypeSchema, animalTypeValues, createAnimalTypeSchema } from "./animal-type.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { AnimalTypeSelect } from "./components/animal-type-select";
import { AnimalSexSelect } from "../additional-crud/components/animal-sex-select";

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
          name="name.ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("animalTypes.name")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("animalTypes.name")} {...field} rows={3} />
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
              <FormLabel>{t("animalTypes.name")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("animalTypes.name")} {...field} rows={3} />
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
              <FormLabel>{t("inspections.parentType")}</FormLabel>
              <FormControl>
                <AnimalTypeSelect placeholder={t("inspections.parentType")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="sexId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пол (ограничение)</FormLabel>
              <FormControl>
                <AnimalSexSelect placeholder="Все полы" value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="minAgeMonths"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Мин. возраст (мес.)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="maxAgeMonths"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Макс. возраст (мес.)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="—" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="modelKey"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ключ AI модели</FormLabel>
              <FormControl>
                <Input placeholder="например: buqa, sigir" {...field} />
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
