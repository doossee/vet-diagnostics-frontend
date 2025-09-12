import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BLOOD_SERUM } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { BLOOD_SERUM_TESTS } from "@/shared/constants";
import { AnimalSelect } from "../animals/components/animal-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { BloodSerumTestSchema, createBloodSerumTestSchema, bloodSerumTestValues } from "./blood-serum-test.model";

interface BloodSerumTestFormProps {
  animalId: number | null;
  defaultValues?: BloodSerumTestSchema;
  onSubmit: (values: BloodSerumTestSchema) => void;
}

export function BloodSerumTestForm({ onSubmit, defaultValues, animalId }: BloodSerumTestFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<BloodSerumTestSchema>({
    resolver: zodResolver(createBloodSerumTestSchema(t, locale)),
    defaultValues: defaultValues || bloodSerumTestValues(animalId),
  });

  useEffect(() => {
    if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  }, [defaultValues]);

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        
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
        {Object.keys(BLOOD_SERUM_TESTS).map((key) => {
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as BLOOD_SERUM}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale]} ({BLOOD_SERUM_TESTS[key as BLOOD_SERUM][`unit_${locale}`]})
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
          {t(form.formState.isSubmitting ? "form.submiting" : "form.submit")}
        </Button>
      </form>
    </Form>
  );
}
