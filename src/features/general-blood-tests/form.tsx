import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GENERAL_BLOOD } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { GENERAL_BLOOD_TESTS } from "@/shared/constants";
import { Textarea } from "@/shared/components/ui/textarea";
import { DatePicker } from "@/shared/components/date-picker";
import { AnimalSelect } from "../animals/components/animal-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { GeneralBloodTestSchema, createGeneralBloodTestSchema, generalBloodTestValues } from "./general-blood-test.model";

interface GeneralBloodTestFormProps {
  animalId: number | null;
  defaultValues?: GeneralBloodTestSchema;
  onSubmit: (values: GeneralBloodTestSchema) => void;
}

export function GeneralBloodTestForm({ onSubmit, defaultValues, animalId }: GeneralBloodTestFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<GeneralBloodTestSchema>({
    resolver: zodResolver(createGeneralBloodTestSchema(t, locale)),
    defaultValues: defaultValues ? { ...defaultValues, date: new Date(defaultValues.date) } : generalBloodTestValues(animalId),
  });

  useEffect(() => {
    if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  }, [defaultValues]);

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
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
        
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 pt-1 justify-between">
              <FormLabel>{t("form.date")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {Object.keys(GENERAL_BLOOD_TESTS).map((key) => {
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as GENERAL_BLOOD}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 pt-1 justify-between">
                  <FormLabel>
                    {GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][locale]} ({GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][`unit_${locale}`]})
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][locale]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <FormField
          name="conclusion"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>{t("inspections.conclusion")}</FormLabel>
              <FormControl>
                <Textarea rows={6} className="resize-none" placeholder={t("inspections.conclusion")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
          {t(form.formState.isSubmitting ? "form.submiting" : "form.submit")}
        </Button>
      </form>
    </Form>
  );
}
