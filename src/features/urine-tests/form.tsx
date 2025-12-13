// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlaskConical, Microscope, ScanSearch } from "lucide-react";

import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { Divider } from "@/shared/components/divider";
import { Button } from "@/shared/components/ui/button";
// import { AnimalSelect } from "../animals/components/animal-select";
import { UrineColorSelect } from "../urine-colors/components/urine-color-select";
import { UrineSmellsSelect } from "../additional-crud/components/urine-smells-select";
import { UrineClaritiesSelect } from "../additional-crud/components/urine-clarities-select";
import { UrineTestSchema, createUrineTestSchema, urineTestValues } from "./urine-test.model";
import { UrineConsistenciesSelect } from "../additional-crud/components/urine-consistencies-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface UrineTestFormProps {
  defaultValues?: UrineTestSchema;
  onSubmit: (values: UrineTestSchema) => void;
}

export function UrineTestForm({ onSubmit, defaultValues }: UrineTestFormProps) {
  const { t } = useI18n();

  const form = useForm<UrineTestSchema>({
    resolver: zodResolver(createUrineTestSchema(t)),
    defaultValues: defaultValues || (urineTestValues as any),
  });

  // const animalTypeId = form.watch("animalTypeId" as any);

  // useEffect(() => {
  //   if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.animalTypeId);
  // }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* <FormField
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

        <FormField
          name="urineColorId"
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

        <Divider label={t("inspections.macroscopicExamination")} icon={<ScanSearch />} className="col-span-1 md:col-span-2" />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.amount")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.amount")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="urineClarityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.clarity")}</FormLabel>
              <FormControl>
                <UrineClaritiesSelect placeholder={t("inspections.clarity")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="urineConsistencyId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.consistency")}</FormLabel>
              <FormControl>
                <UrineConsistenciesSelect placeholder={t("inspections.consistency")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="urineSmellId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.smell")}</FormLabel>
              <FormControl>
                <UrineSmellsSelect placeholder={t("inspections.smell")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Divider label={t("inspections.microscopicExamination")} icon={<Microscope />} className="col-span-1 md:col-span-2" />

        <FormField
          name="leukocytes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.leukocytes")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.leukocytes")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="epithelium"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.epithelium")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.epithelium")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="microbialBodies"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.microbialBodies")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.microbialBodies")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="erythrocytes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.erythrocytes")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.erythrocytes")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="saltCrystals"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.saltCrystals")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.saltCrystals")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Divider label={t("inspections.laboratoryExamination")} icon={<FlaskConical />} className="col-span-1 md:col-span-2" />

        <FormField
          name="ph"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.ph")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.ph")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="acetone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.acetone")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.acetone")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="protein"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.protein")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.protein")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="bilirubin"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.bilirubin")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.bilirubin")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="urobilinogen"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.urobilinogen")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.urobilinogen")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="sugar"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.sugar")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.sugar")} {...field} />
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
