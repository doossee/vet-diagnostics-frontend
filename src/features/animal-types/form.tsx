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
    defaultValues: defaultValues
      ? {
          name: { ru: defaultValues.name?.ru ?? "", uz: defaultValues.name?.uz ?? "" },
          parentId: defaultValues.parentId ?? "",
          modelKey: defaultValues.modelKey ?? "",
          sexId: defaultValues.sexId ?? "",
          minAgeMonths: defaultValues.minAgeMonths ?? undefined,
          maxAgeMonths: defaultValues.maxAgeMonths ?? undefined,
        }
      : animalTypeValues,
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
              <FormLabel>{t("management.sexRestriction")}</FormLabel>
              <FormControl>
                <AnimalSexSelect placeholder={t("management.allSexes")} value={field.value} onChange={field.onChange} />
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
                <FormLabel>{t("management.minAgeMonths")}</FormLabel>
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
                <FormLabel>{t("management.maxAgeMonths")}</FormLabel>
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
              <FormLabel>{t("management.aiModelKey")}</FormLabel>
              <FormControl>
                <Input placeholder={t("management.aiModelKeyPlaceholder")} {...field} />
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
