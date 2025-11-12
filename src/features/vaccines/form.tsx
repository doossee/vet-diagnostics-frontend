import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/date-picker";
import { VaccineSchema, createVaccineSchema, vaccineValues } from "./vaccine.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { AnimalSelect } from "../animals/components/animal-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { VaccineTypeSelect } from "../vaccine-types/components/vaccine-type-select";

interface VaccineFormProps {
  hideAnimals?: boolean;
  defaultValues?: VaccineSchema;
  onSubmit: (values: VaccineSchema) => void;
  onSkip?: () => void;
}

export function VaccineForm({ onSubmit, defaultValues, hideAnimals, onSkip }: VaccineFormProps) {
  const { t } = useI18n();

  const form = useForm<VaccineSchema>({
    resolver: zodResolver(createVaccineSchema(t)),
    defaultValues: defaultValues ? { ...defaultValues, date: new Date(defaultValues.date) } : (vaccineValues as any),
  });

  useEffect(() => {
    if (hideAnimals) form.setValue("animalId", undefined as any);
  }, [hideAnimals]);

  useEffect(() => {
    if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  }, [defaultValues]);

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col pt-1.5 gap-1">
              <FormLabel>{t("form.date")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!hideAnimals && (
          <>
            <FormField
              name={"animalTypeId" as any}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("animals.animalType")}</FormLabel>
                  <FormControl>
                    <AnimalTypeSelect placeholder={t("animals.animalType")} value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="animalId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.animal")}</FormLabel>
                  <FormControl>
                    <AnimalSelect placeholder={t("form.animal")} value={field.value} onChange={field.onChange} typeId={animalTypeId} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          name="typeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.vaccineType")}</FormLabel>
              <FormControl>
                <VaccineTypeSelect placeholder={t("management.vaccineType")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-1" />
        <div className={clsx("grid gap-4", !!onSkip ? "md:grid-cols-2" : "")}>
          {!!onSkip && (
            <Button onClick={onSkip} type="button" variant={"secondary"}>
              {t("form.skip")}
            </Button>
          )}
          <Button disabled={form.formState.isSubmitting} type="submit">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
