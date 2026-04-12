// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDot, Droplet, Layers, ListChecks, PersonStanding } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Divider } from "@/shared/components/divider";
import { Button } from "@/shared/components/ui/button";
// import { AnimalSelect } from "../animals/components/animal-select";
// import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { GeneralInspectionSchema, createGeneralInspectionSchema, generalInspectionValues } from "./general-inspection.model";
import { BodyTypesSelect } from "../additional-crud/components/body-types-select";
import { ObesityTypesSelect } from "../additional-crud/components/obesity-types-select";
import { BodyPositionsSelect } from "../additional-crud/components/body-positions-select";
import { ConstitutionsSelect } from "../additional-crud/components/constitutions-select";
import { TemperamentsSelect } from "../additional-crud/components/temperaments-select";
import { WoolTypesSelect } from "../additional-crud/components/wool-types-select";
import { DownTypesSelect } from "../additional-crud/components/down-types-select";
import { HairTypesSelect } from "../additional-crud/components/hair-types-select";
import { FeatherTypesSelect } from "../additional-crud/components/feather-types-select";
import { SkinColorsSelect } from "../additional-crud/components/skin-colors-select";
import { SkinHumiditiesSelect } from "../additional-crud/components/skin-humidities-select";
import { SkinTempsSelect } from "../additional-crud/components/skin-temps-select";
import { SkinElasticitiesSelect } from "../additional-crud/components/skin-elasticities-select";
import { LymphSizesSelect } from "../additional-crud/components/lymph-sizes-select";
import { LymphShapesSelect } from "../additional-crud/components/lymph-shapes-select";
import { LymphSurfacesSelect } from "../additional-crud/components/lymph-surfaces-select";
import { LymphConsistenciesSelect } from "../additional-crud/components/lymph-consistencies-select";
import { LymphTempsSelect } from "../additional-crud/components/lymph-temps-select";
import { LymphPainsSelect } from "../additional-crud/components/lymph-pains-select";
import { LymphMobilitiesSelect } from "../additional-crud/components/lymph-mobilities-select";
import { SkinSmellsSelect } from "../additional-crud/components/skin-smells-select";
import { SkinSurfacesSelect } from "../additional-crud/components/skin-surfaces-select";
import { SkinSensitivitiesSelect } from "../additional-crud/components/skin-sensitivities-select";
import { SkinPainsSelect } from "../additional-crud/components/skin-pains-select";

interface GeneralInspectionFormProps {
  defaultValues?: GeneralInspectionSchema;
  onSubmit: (values: GeneralInspectionSchema) => void;
}

export function GeneralInspectionForm({ onSubmit, defaultValues }: GeneralInspectionFormProps) {
  const { t } = useI18n();

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

        <FormField
          name="bodyTypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.bodyType")}</FormLabel>
              <FormControl>
                <BodyTypesSelect placeholder={t("inspections.bodyType")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="obesityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.obesity")}</FormLabel>
              <FormControl>
                <ObesityTypesSelect placeholder={t("inspections.obesity")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bodyPositionId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.bodyPosition")}</FormLabel>
              <FormControl>
                <BodyPositionsSelect placeholder={t("inspections.bodyPosition")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="constitutionId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.constitution")}</FormLabel>
              <FormControl>
                <ConstitutionsSelect placeholder={t("inspections.constitution")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="temperamentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.temperament")}</FormLabel>
              <FormControl>
                <TemperamentsSelect placeholder={t("inspections.temperament")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Divider label={t("inspections.skinCover")} icon={<Layers />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <FormField
          name="woolId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.wool")}</FormLabel>
              <FormControl>
                <WoolTypesSelect placeholder={t("inspections.wool")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="downId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.down")}</FormLabel>
              <FormControl>
                <DownTypesSelect placeholder={t("inspections.down")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="hairId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.hair")}</FormLabel>
              <FormControl>
                <HairTypesSelect placeholder={t("inspections.hair")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="feathersId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.feathers")}</FormLabel>
              <FormControl>
                <FeatherTypesSelect placeholder={t("inspections.feathers")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Divider label={t("inspections.skin")} icon={<Droplet />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <FormField
          name="skinColorId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.skinColor")}</FormLabel>
              <FormControl>
                <SkinColorsSelect placeholder={t("inspections.skinColor")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skinHumidityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.skinHumidity")}</FormLabel>
              <FormControl>
                <SkinHumiditiesSelect placeholder={t("inspections.skinHumidity")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skinSmellId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSmell")}</FormLabel>
              <FormControl>
                {/* <Input placeholder={t("inspections.skinSmell")} {...field} /> */}
                <SkinSmellsSelect placeholder={t("inspections.skinSmell")} value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="skinTempId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.skinTemp")}</FormLabel>
              <FormControl>
                <SkinTempsSelect placeholder={t("inspections.skinTemp")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skinSurfaceId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSurface")}</FormLabel>
              <FormControl>
                {/* <Input placeholder={t("inspections.skinSurface")} {...field} /> */}
                <SkinSurfacesSelect placeholder={t("inspections.skinSurface")} value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="skinElasticityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.skinElasticity")}</FormLabel>
              <FormControl>
                <SkinElasticitiesSelect placeholder={t("inspections.skinElasticity")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="skinSensitivityId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinSensitivity")}</FormLabel>
              <FormControl>
                {/* <Input placeholder={t("inspections.skinSensitivity")} {...field} /> */}
                <SkinSensitivitiesSelect placeholder={t("inspections.skinSensitivity")} value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="skinPainId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{t("inspections.skinPain")}</FormLabel>
              <FormControl>
                {/* <Input placeholder={t("inspections.skinPain")} {...field} /> */}
                <SkinPainsSelect placeholder={t("inspections.skinPain")} value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Divider label={t("inspections.lymphNodes")} icon={<CircleDot />} className="col-span-1 md:col-span-2 lg:col-span-3" />

        <FormField
          name="lymphSizeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphSize")}</FormLabel>
              <FormControl>
                <LymphSizesSelect placeholder={t("inspections.lymphSize")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="lymphShapeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphShape")}</FormLabel>
              <FormControl>
                <LymphShapesSelect placeholder={t("inspections.lymphShape")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="lymphSurfaceId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphSurface")}</FormLabel>
              <FormControl>
                <LymphSurfacesSelect placeholder={t("inspections.lymphSurface")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="lymphConsistencyId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphConsistency")}</FormLabel>
              <FormControl>
                <LymphConsistenciesSelect placeholder={t("inspections.lymphConsistency")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lymphTempId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphTemp")}</FormLabel>
              <FormControl>
                <LymphTempsSelect placeholder={t("inspections.lymphTemp")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lymphPainId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphPain")}</FormLabel>
              <FormControl>
                <LymphPainsSelect placeholder={t("inspections.lymphPain")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lymphMobilityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.lymphMobility")}</FormLabel>
              <FormControl>
                <LymphMobilitiesSelect placeholder={t("inspections.lymphMobility")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
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