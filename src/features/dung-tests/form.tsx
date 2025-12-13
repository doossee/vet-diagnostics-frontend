import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Microscope, ScanSearch } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useI18n } from "@/shared/hooks/use-i18n";
import { Divider } from "@/shared/components/divider";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { AnimalSelect } from "../animals/components/animal-select";
import { DungColorSelect } from "../dung-colors/components/dung-color-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { DungTestSchema, createDungTestSchema, dungTestValues } from "./dung-test.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { DungFormsSelect } from "../additional-crud/components/dung-forms-select";
import { DungConsistenciesSelect } from "../additional-crud/components/dung-consistencies-select copy 3";
import { DungSmellsSelect } from "../additional-crud/components/dung-smells-select";

interface DungTestFormProps {
  defaultValues?: DungTestSchema;
  onSubmit: (values: DungTestSchema) => void;
}

export function DungTestForm({ onSubmit, defaultValues }: DungTestFormProps) {
  const { t } = useI18n();

  const form = useForm<DungTestSchema>({
    resolver: zodResolver(createDungTestSchema(t)),
    defaultValues: defaultValues || (dungTestValues as any),
  });

  useEffect(() => {
    if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.animalTypeId);
  }, [defaultValues]);

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
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

        <Divider label="Макроскопическое исследование" icon={<ScanSearch />} className="col-span-1 md:col-span-2" />
        
        <FormField
          name="fecesColorId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.color")}</FormLabel>
              <FormControl>
                <DungColorSelect placeholder={t("form.color")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="fecesSmellId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.smell")}</FormLabel>
              <FormControl>
                <DungSmellsSelect placeholder={t("inspections.smell")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="fecesConsistencyId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.clarity")}</FormLabel>
              <FormControl>
                <DungConsistenciesSelect placeholder={t("inspections.clarity")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fecesFormId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.form")}</FormLabel>
              <FormControl>
                <DungFormsSelect placeholder={t("inspections.form")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Divider label="Микроскопическое исследование" icon={<Microscope />} className="col-span-1 md:col-span-2" />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Количество"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Количество"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          name="undigestedFood"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Количество непереваренной пищи"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Количество непереваренной пищи"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
