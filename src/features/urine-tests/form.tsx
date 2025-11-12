import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { CLARITY_TYPES, SMELL_TYPES } from "@/shared/constants";
import { AnimalSelect } from "../animals/components/animal-select";
import { DiseaseSelect } from "../diseases/components/disease-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { UrineColorSelect } from "../urine-colors/components/urine-color-select";
import { UrineTestSchema, createUrineTestSchema, urineTestValues } from "./urine-test.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface UrineTestFormProps {
  defaultValues?: UrineTestSchema;
  onSubmit: (values: UrineTestSchema) => void;
}

export function UrineTestForm({ onSubmit, defaultValues }: UrineTestFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<UrineTestSchema>({
    resolver: zodResolver(createUrineTestSchema(t)),
    defaultValues: defaultValues || (urineTestValues as any),
  });

  useEffect(() => {
    if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  }, [defaultValues]);

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="consistency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.consistency")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.consistency")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="smell"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.smell")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inspections.smell")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(SMELL_TYPES).map((k) => (
                      <SelectItem key={k} value={k}>
                        {SMELL_TYPES[k as keyof typeof SMELL_TYPES][locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="clarity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.clarity")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inspections.clarity")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(CLARITY_TYPES).map((k) => (
                      <SelectItem key={k} value={k}>
                        {CLARITY_TYPES[k as keyof typeof CLARITY_TYPES][locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="diseaseId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.disease")}</FormLabel>
              <FormControl>
                <DiseaseSelect placeholder={t("form.disease")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="colorId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.color")}</FormLabel>
              <FormControl>
                <UrineColorSelect placeholder={t("form.color")} value={field.value} onChange={field.onChange} />
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
