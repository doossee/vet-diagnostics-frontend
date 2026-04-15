import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
// import { Textarea } from "@/shared/components/ui/textarea";
// import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { MucosaExamSchema, createMucosaExamSchema, mucosaExamValues } from "./mucosa-exam.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { EyeLidSelect } from "../eye-lid/components/eye-lid-select";
import { MucosaTypesSelect } from "../additional-crud/components/mucosa-types-select";

interface MucosaExamFormProps {
  defaultValues?: MucosaExamSchema;
  onSubmit: (values: MucosaExamSchema) => void;
  excludeTypeIds?: string[];
}

export function MucosaExamForm({ onSubmit, defaultValues, excludeTypeIds }: MucosaExamFormProps) {
  const { t } = useI18n();

  const form = useForm<MucosaExamSchema>({
    resolver: zodResolver(createMucosaExamSchema(t)),
    defaultValues: defaultValues || mucosaExamValues,
  });

  const mucosaTypeId = form.watch('mucosaTypeId')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="mucosaTypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.mucosaType")}</FormLabel>
              <FormControl>
                <MucosaTypesSelect placeholder={t("inspections.mucosaType")} value={field.value} onChange={field.onChange} excludeIds={excludeTypeIds} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mucosaTypeId && <FormField
          name="mucosaAppearanceId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.mucosaAppearance")}</FormLabel>
              <FormControl>
                {/* <MucosaTypesSelect /> */}
                <EyeLidSelect placeholder={t("inspections.mucosaAppearance")} typeId={mucosaTypeId} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        
        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
