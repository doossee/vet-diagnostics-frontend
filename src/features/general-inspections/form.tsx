// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDot, Droplet, Layers, ListChecks, PersonStanding, TestTube } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Divider } from "@/shared/components/divider";
import { Button } from "@/shared/components/ui/button";
// import { AnimalSelect } from "../animals/components/animal-select";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";
// import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { DOWN_TYPE, FEATHER_TYPE, HAIR_TYPE, WOOL_TYPE } from "@/entities/general-inspections/utils/constants/skin-cover";
import { SKIN_COLOR, SKIN_ELASTICITY, SKIN_HUMIDITY, SKIN_TEMP } from "@/entities/general-inspections/utils/constants/skin";
import { GeneralInspectionSchema, createGeneralInspectionSchema, generalInspectionValues } from "./general-inspection.model";
import { BODY_POSITION, BODY_TYPE, CONSTITUTION, OBESITY_TYPE, TEMPERAMENT } from "@/entities/general-inspections/utils/constants/habitus";
import { LYMPH_CONSISTENCY, LYMPH_MOBILITY, LYMPH_PAIN, LYMPH_SHAPE, LYMPH_SIZE, LYMPH_SURFACE, LYMPH_TEMP } from "@/entities/general-inspections/utils/constants/lymph";

interface GeneralInspectionFormProps {
  defaultValues?: GeneralInspectionSchema;
  onSubmit: (values: GeneralInspectionSchema) => void;
}

export function GeneralInspectionForm({ onSubmit, defaultValues }: GeneralInspectionFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<GeneralInspectionSchema>({
    resolver: zodResolver(createGeneralInspectionSchema(t)) as any,
    defaultValues: defaultValues || (generalInspectionValues as any),
  });

  // useEffect(() => {
  //   if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.typeId);
  // }, [defaultValues]);

  // const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <Divider label={t("inspections.generalCondition")} icon={<ListChecks />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <FormField
          name="pulse"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.pulse")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.pulse")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="rumination"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.rumination")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.rumination")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="temperature"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.temperature")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.temperature")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="respiratoryRate"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.respiratoryRate")}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t("inspections.respiratoryRate")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Divider label={t("inspections.habitus")} icon={<PersonStanding />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <ObjectEntriesSelect
          form={form}
          name="bodyType"
          locale={locale}
          object={BODY_TYPE as any}
          label={t("inspections.bodyType")}
          placeholder={t("inspections.bodyType")}
        />

        <ObjectEntriesSelect
          form={form}
          name="obesity"
          locale={locale}
          object={OBESITY_TYPE as any}
          label={t("inspections.obesity")}
          placeholder={t("inspections.obesity")}
        />

        <ObjectEntriesSelect
          form={form}
          name="bodyPosition"
          locale={locale}
          object={BODY_POSITION as any}
          label={t("inspections.bodyPosition")}
          placeholder={t("inspections.bodyPosition")}
        />

        <ObjectEntriesSelect
          form={form}
          name="constitution"
          locale={locale}
          object={CONSTITUTION as any}
          label={t("inspections.constitution")}
          placeholder={t("inspections.constitution")}
        />

        <ObjectEntriesSelect
          form={form}
          name="temperament"
          locale={locale}
          object={TEMPERAMENT as any}
          label={t("inspections.temperament")}
          placeholder={t("inspections.temperament")}
        />

        <Divider label={t("inspections.skinCover")} icon={<Layers />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <ObjectEntriesSelect
          form={form}
          name="wool"
          locale={locale}
          object={WOOL_TYPE as any}
          label={t("inspections.wool")}
          placeholder={t("inspections.wool")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="down"
          locale={locale}
          object={DOWN_TYPE as any}
          label={t("inspections.down")}
          placeholder={t("inspections.down")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="hair"
          locale={locale}
          object={HAIR_TYPE as any}
          label={t("inspections.hair")}
          placeholder={t("inspections.hair")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="feathers"
          locale={locale}
          object={FEATHER_TYPE as any}
          label={t("inspections.feathers")}
          placeholder={t("inspections.feathers")}
        />

        <Divider label={t("inspections.skin")} icon={<Droplet />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <ObjectEntriesSelect
          form={form}
          name="skinColor"
          locale={locale}
          object={SKIN_COLOR as any}
          label={t("inspections.skinColor")}
          placeholder={t("inspections.skinColor")}
        />

        <ObjectEntriesSelect
          form={form}
          name="skinHumidity"
          locale={locale}
          object={SKIN_HUMIDITY as any}
          label={t("inspections.skinHumidity")}
          placeholder={t("inspections.skinHumidity")}
        />

        <FormField
          name="skinSmell"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSmell")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.skinSmell")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <ObjectEntriesSelect
          form={form}
          name="skinTemp"
          locale={locale}
          object={SKIN_TEMP as any}
          label={t("inspections.skinTemp")}
          placeholder={t("inspections.skinTemp")}
        />

        <FormField
          name="skinSurface"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSurface")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.skinSurface")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <ObjectEntriesSelect
          form={form}
          name="skinElasticity"
          locale={locale}
          object={SKIN_ELASTICITY as any}
          label={t("inspections.skinElasticity")}
          placeholder={t("inspections.skinElasticity")}
        />

        <FormField
          name="skinSensitivity"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSensitivity")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.skinSensitivity")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="skinPain"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinPain")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.skinPain")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Divider label={t("inspections.lymphNodes")} icon={<CircleDot />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <ObjectEntriesSelect
          form={form}
          name="lymphSize"
          locale={locale}
          object={LYMPH_SIZE as any}
          label={t("inspections.lymphSize")}
          placeholder={t("inspections.lymphSize")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="lymphShape"
          locale={locale}
          object={LYMPH_SHAPE as any}
          label={t("inspections.lymphShape")}
          placeholder={t("inspections.lymphShape")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="lymphSurface"
          locale={locale}
          object={LYMPH_SURFACE as any}
          label={t("inspections.lymphSurface")}
          placeholder={t("inspections.lymphSurface")}
        />
        
        <ObjectEntriesSelect
          form={form}
          name="lymphConsistency"
          locale={locale}
          object={LYMPH_CONSISTENCY as any}
          label={t("inspections.lymphConsistency")}
          placeholder={t("inspections.lymphConsistency")}
        />

        <ObjectEntriesSelect
          form={form}
          name="lymphTemp"
          locale={locale}
          object={LYMPH_TEMP as any}
          label={t("inspections.lymphTemp")}
          placeholder={t("inspections.lymphTemp")}
        />

        <ObjectEntriesSelect
          form={form}
          name="lymphPain"
          locale={locale}
          object={LYMPH_PAIN as any}
          label={t("inspections.lymphPain")}
          placeholder={t("inspections.lymphPain")}
        />

        <ObjectEntriesSelect
          form={form}
          name="lymphMobility"
          locale={locale}
          object={LYMPH_MOBILITY as any}
          label={t("inspections.lymphMobility")}
          placeholder={t("inspections.lymphMobility")}
        />
        
        <Divider label={t("inspections.rumenFluid")} icon={<TestTube />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <FormField
          name="rumenInfusoriaCount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.rumenInfusoriaCount")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.rumenInfusoriaCount")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="rumenFluidState"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.rumenFluidState")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inspections.rumenFluidState")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />


        <div className="col-span-1 md:col-span-2 lg:col-span-3" />

        <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
          {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
        </Button>
      </form>
    </Form>
  );
}
