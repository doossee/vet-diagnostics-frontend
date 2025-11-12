import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { DatePicker } from "@/shared/components/date-picker";
import { DiseaseSchema, createDiseaseSchema, diseaseValues } from "./disease.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { DiseaseTypeSelect } from "../disease-types/components/disease-type-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { AnimalSelect } from "../animals/components/animal-select";

interface DiseaseFormProps {
  defaultValues?: DiseaseSchema;
  onSubmit: (values: DiseaseSchema) => void;
}

export function DiseaseForm({ onSubmit, defaultValues }: DiseaseFormProps) {
  const { t } = useI18n();

  const form = useForm<DiseaseSchema>({
    resolver: zodResolver(createDiseaseSchema(t)),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          endTime: new Date(defaultValues.endTime),
          startTime: new Date(defaultValues.startTime),
        }
      : (diseaseValues as any),
  });

  const animalTypeId = form.watch("animalTypeId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="startTime"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.startDate")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="endTime"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.endDate")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="typeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.diseaseType")}</FormLabel>
              <FormControl>
                <DiseaseTypeSelect placeholder={t("form.diseaseType")} value={field.value} onChange={field.onChange} />
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
          name="conclusion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.conclusion")}</FormLabel>
              <FormControl>
                <Textarea rows={6} className="resize-none" placeholder={t("inspections.conclusion")} {...field} />
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
