import clsx from "clsx";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/date-picker";
import { BreedSelect } from "../breeds/components/breed-select";
import { FarmerSelect } from "../users/components/farmer-select";
import { AnimalSchema, animalValues, createAnimalSchema } from "./animal.model";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { AnimalColorSelect } from "../animal-colors/components/animal-color-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ANIMAL_GENDERS } from "@/entities/animals/utils/constants/animal-genders";

interface AnimalFormProps {
  showFarmer: boolean;
  defaultValues?: AnimalSchema;
  submitRightContent?: ReactNode;
  onSubmit: (values: AnimalSchema) => void;
}

export function AnimalForm({ onSubmit, defaultValues, submitRightContent }: AnimalFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<AnimalSchema>({
    resolver: zodResolver(createAnimalSchema(t)),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          arrivalDate: new Date(defaultValues.arrivalDate),
        }
      : (animalValues as any),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="animalNameCode"
            control={form.control}
            render={({ field: { value, onChange, ...other } }) => (
              <FormItem>
                <FormLabel>{"Name"}</FormLabel>
                <FormControl>
                  <Input placeholder={"Name"} value={value} onChange={(v) => onChange(v.target.value)} {...other} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="animalTypeId"
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

          {/* {selectedType?._count?.children > 0 && (
            <FormField
              name="childAnimalTypeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("animals.childAnimalType")}</FormLabel>
                  <FormControl>
                    <AnimalTypeSelect
                      placeholder={t("animals.childAnimalType")}
                      parentId={selectedTypeId}  // показываем только детей!
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}

          <FormField
            name="animalBreedId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("management.breedParent")}</FormLabel>
                <FormControl>
                  <BreedSelect placeholder={t("management.breedParent")} value={field.value} onChange={field.onChange} />
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
                <FormLabel>{t("animals.weight")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("animals.weight")} value={value} onChange={(v) => onChange(+v.target.value)} {...other} />
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
