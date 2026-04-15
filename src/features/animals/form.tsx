import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/date-picker";
import { MonthYearPicker } from "@/shared/components/month-year-picker";
import { BreedSelect } from "../breeds/components/breed-select";
import { AnimalSchema, animalValues, createAnimalSchema } from "./animal.model";
import { AnimalColorSelect } from "../animal-colors/components/animal-color-select";
import { AnimalTypeTreeSelect } from "../animal-types/components/animal-type-tree-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Animal, AnimalType } from "@/shared/types";
import { AnimalSexSelect } from "../additional-crud/components/animal-sex-select";

interface AnimalFormProps {
  showFarmer: boolean;
  defaultValues?: AnimalSchema | Animal;
  submitRightContent?: ReactNode;
  onSubmit: (values: AnimalSchema) => void;
}


export function AnimalForm({ onSubmit, defaultValues, submitRightContent, showFarmer: _showFarmer }: AnimalFormProps) {
  const { t } = useI18n();
  const [animalType, setAnimalType] = useState<AnimalType | null>(null);

  const resolvedDefaultValues = useMemo(() => {
    if (!defaultValues) return animalValues as any;

    const birthDate = (defaultValues as any)?.birthDate ? new Date((defaultValues as any).birthDate) : null;

    return {
      ...animalValues,
      ...defaultValues,
      arrivalDate: defaultValues.arrivalDate ? new Date(defaultValues.arrivalDate as any) : null,
      birthYear: (defaultValues as any)?.birthYear ?? (birthDate ? birthDate.getFullYear() : animalValues.birthYear),
      birthMonth: (defaultValues as any)?.birthMonth ?? (birthDate ? birthDate.getMonth() + 1 : animalValues.birthMonth),
      sexId: (defaultValues as any)?.sexId ?? null,
      farmerId: (defaultValues as any)?.farmerId ?? null,
    };
  }, [defaultValues]);

  const form = useForm<AnimalSchema>({
    resolver: zodResolver(createAnimalSchema(t)),
    defaultValues: resolvedDefaultValues,
  });

  useEffect(() => {
    form.reset(resolvedDefaultValues);
  }, [form, resolvedDefaultValues]);

  useEffect(() => {
    if ((defaultValues as any)?.animalType) {
      setAnimalType((defaultValues as any).animalType);
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            name="animalTypeId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("animals.animalType")}</FormLabel>
                <FormControl>
                  <AnimalTypeTreeSelect placeholder={t("animals.animalType")} value={animalType} onChange={field.onChange} parentId={null} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="animalNameCode"
            control={form.control}
            render={({ field: { value, onChange, ...other } }) => (
              <FormItem>
                <FormLabel>{t("animals.name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("animals.name")} value={value} onChange={(event) => onChange(event.target.value)} {...other} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="animalBreedId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("animals.breed")}</FormLabel>
                <FormControl>
                  <BreedSelect placeholder={t("animals.breed")} value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="sexId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.gender")}</FormLabel>
                <FormControl>
                  <AnimalSexSelect placeholder={t("form.gender")} value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="birthMonth"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth month</FormLabel>
                <FormControl>
                  <MonthYearPicker
                    month={field.value}
                    year={form.watch("birthYear")}
                    onChange={(year, month) => {
                      field.onChange(month);
                      form.setValue("birthYear", year as never, { shouldValidate: true, shouldDirty: true });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="animalColorId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("animals.color")}</FormLabel>
                <FormControl>
                  <AnimalColorSelect placeholder={t("animals.color")} value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="arrivalDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 pt-1.5">
                <FormLabel>{t("animals.arrivalDate")}</FormLabel>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-1 items-end w-full">
          <div className={clsx("grid place-items-end gap-4 w-full", submitRightContent ? "grid-cols-2" : "")}>
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
              {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
            </Button>
            {submitRightContent}
          </div>
        </div>
      </form>
    </Form>
  );
}
