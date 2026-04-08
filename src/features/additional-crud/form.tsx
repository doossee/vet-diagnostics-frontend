import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { AdditionalCrudSchema, additionalCrudValues, createAdditionalCrudSchema } from "./additional-crud.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { AnimalTypeTreeSelect } from "../animal-types/components/animal-type-tree-select";
import { AnimalType } from "@/shared/types";
import { Input } from "@/shared/components/ui/input";

interface FormProps {
  nameTitle?: string
  defaultValues?: AdditionalCrudSchema;
  onSubmit: (values: AdditionalCrudSchema) => void;
}

export function AdditionalCrudForm({ onSubmit, defaultValues }: FormProps) {
  const { t } = useI18n();
  const [animalType, setAnimalType] = useState<AnimalType|null>(null);

  const form = useForm<AdditionalCrudSchema>({
    resolver: zodResolver(createAdditionalCrudSchema(t)),
    defaultValues: defaultValues || additionalCrudValues,
  });

  useEffect(() => {
    if((defaultValues as any)?.animalType) {
      setAnimalType((defaultValues as any)?.animalType)
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="numericValue"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Значения"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Значения"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name.ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.name")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("inspections.name")} {...field} rows={3} />
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
              <FormLabel>{t("inspections.name")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("inspections.name")} {...field} rows={3} />
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
              <FormLabel>{t("animals.animalType")}</FormLabel>
              <FormControl>
                <AnimalTypeTreeSelect placeholder={t("animals.animalType")} value={animalType} onChange={field.onChange} />
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
