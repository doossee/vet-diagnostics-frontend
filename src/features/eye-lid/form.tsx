import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { MUCOSA_TYPES } from "@/entities/eye-lid/utils/constants/mucosa-types";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";
import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { EyeLidSchema, createEyeLidSchema, eyeLidValues } from "./eye-lid.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { AnimalTypeTreeSelect } from "../animal-types/components/animal-type-tree-select";

interface EyeLidFormProps {
  defaultValues?: EyeLidSchema;
  onSubmit: (values: EyeLidSchema) => void;
}

export function EyeLidForm({ onSubmit, defaultValues }: EyeLidFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<EyeLidSchema>({
    resolver: zodResolver(createEyeLidSchema(t)),
    defaultValues: defaultValues || eyeLidValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="animalTypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("animals.animalType")}</FormLabel>
              <FormControl>
                <AnimalTypeTreeSelect placeholder={t("animals.animalType")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name_ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.eyeLidName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.eyeLidName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name_uz"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.eyeLidName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.eyeLidName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ObjectEntriesSelect
          form={form}
          locale={locale}
          name="mucosaType"
          object={MUCOSA_TYPES}
          label={"Тип слизистой оболочки"}
          placeholder={"Тип слизистой оболочки"}
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
