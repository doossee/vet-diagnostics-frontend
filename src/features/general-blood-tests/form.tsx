import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Droplet, FlaskRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { Divider } from "@/shared/components/divider";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
// import { AnimalSelect } from "../animals/components/animal-select";
// import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { BLOOD_TEST_FIELDS } from "@/entities/general-blood-tests/utils/constants/blood-test-fields";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { GeneralBloodTestSchema, createGeneralBloodTestSchema, generalBloodTestValues } from "./general-blood-test.model";

interface GeneralBloodTestFormProps {
  animalId?: string | null;
  defaultValues?: GeneralBloodTestSchema;
  onSubmit: (values: GeneralBloodTestSchema) => void;
}

export function GeneralBloodTestForm({ onSubmit, defaultValues, animalId }: GeneralBloodTestFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<GeneralBloodTestSchema>({
    resolver: zodResolver(createGeneralBloodTestSchema(t, locale)),
    defaultValues: defaultValues ?? generalBloodTestValues(animalId ? String(animalId) : null),
  });

  // useEffect(() => {
  //   if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  // }, [defaultValues]);

  // const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {/* <FormField
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
        /> */}

        {Object.entries(BLOOD_TEST_FIELDS).map(([key, value], index) =>
          <Fragment key={key}>
            {index === 0 && <Divider label="Морфологическое исследование крови" icon={<Droplet />} className="col-span-1 md:col-span-2 lg:col-span-3" />}
            {index === 8 && <Divider label="Исследование сыворотки крови" icon={<FlaskRound />} className="col-span-1 md:col-span-2 lg:col-span-3" />}
            <FormField
              name={key}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 pt-1 justify-between">
                  <FormLabel>
                    {value[locale]} ({value[`unit_${locale}`]})
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={value[locale]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fragment>)}

        <FormField
          name="conclusion"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
              <FormLabel>{t("inspections.conclusion")}</FormLabel>
              <FormControl>
                <Textarea rows={6} className="resize-none" placeholder={t("inspections.conclusion")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
          {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
        </Button>
      </form>
    </Form>
  );
}
