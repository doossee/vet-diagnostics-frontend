import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/date-picker";
import { BreedSelect } from "../breeds/components/breed-select";
import { AnimalSchema, animalValues, createAnimalSchema } from "./animal.model";
import { AnimalColorSelect } from "../animal-colors/components/animal-color-select";
import { ANIMAL_GENDERS } from "@/entities/animals/utils/constants/animal-genders";
import { AnimalTypeTreeSelect } from "../animal-types/components/animal-type-tree-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { AnimalType } from "@/shared/types";

interface AnimalFormProps {
  showFarmer: boolean;
  defaultValues?: AnimalSchema;
  submitRightContent?: ReactNode;
  onSubmit: (values: AnimalSchema) => void;
}

export function AnimalForm({ onSubmit, defaultValues, submitRightContent }: AnimalFormProps) {
  const { t, locale } = useI18n();
  const [animalType, setAnimalType] = useState<AnimalType|null>(null);
  
  const form = useForm<AnimalSchema>({
    resolver: zodResolver(createAnimalSchema(t)),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          arrivalDate: new Date(defaultValues.arrivalDate),
        }
      : (animalValues as any),
  });

  useEffect(() => {
    if((defaultValues as any)?.animalType) {
      setAnimalType((defaultValues as any)?.animalType)
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name={"animalTypeId"}
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
                  <Input placeholder={t("animals.name")} value={value} onChange={(v) => onChange(v.target.value)} {...other} />
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
            name="age"
            control={form.control}
            render={({ field: { value, onChange, ...other } }) => (
              <FormItem>
                <FormLabel>{t("animals.age")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("animals.age")} value={value} onChange={(v) => onChange(+v.target.value)} {...other} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.gender")}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("form.gender")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ANIMAL_GENDERS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value[locale]}
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
              <FormItem className="flex flex-col pt-1.5 gap-1">
                <FormLabel>{t("animals.arrivalDate")}</FormLabel>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {showFarmer && <FormField
            name="farmerId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.farmer")}</FormLabel>
                <FormControl>
                  <FarmerSelect value={field.value} onChange={field.onChange} placeholder={t("form.farmer")}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />} */}
        </div>
        <div className="flex-1 flex items-end w-full">
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
