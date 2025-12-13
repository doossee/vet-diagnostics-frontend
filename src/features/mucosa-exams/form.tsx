import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
// import { Textarea } from "@/shared/components/ui/textarea";
import { MUCOSA_TYPES } from "@/entities/eye-lid/utils/constants/mucosa-types";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";
// import { AnimalTypeSelect } from "../animal-types/components/animal-type-select";
import { MucosaExamSchema, createMucosaExamSchema, mucosaExamValues } from "./mucosa-exam.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { AnimalSelect } from "../animals/components/animal-select";
import { EyeLidSelect } from "../eye-lid/components/eye-lid-select";

interface MucosaExamFormProps {
  hideAnimals?: boolean
  defaultValues?: MucosaExamSchema;
  onSubmit: (values: MucosaExamSchema) => void;
}

export function MucosaExamForm({ onSubmit, defaultValues, hideAnimals }: MucosaExamFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<MucosaExamSchema>({
    resolver: zodResolver(createMucosaExamSchema(t)),
    defaultValues: defaultValues || mucosaExamValues,
  });

  const type = form.watch('mucosaType')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        {!hideAnimals && <FormField
          name="animalId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Animal"}</FormLabel>
              <FormControl>
                <AnimalSelect placeholder={"Animal"} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        <ObjectEntriesSelect
          form={form}
          locale={locale}
          name="mucosaType"
          object={MUCOSA_TYPES}
          label={"Mucosa Type"}
          placeholder={"Mucosa Type"}
        />
        {type && <FormField
          name="mucosaAppearanceId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mucosa Appearance</FormLabel>
              <FormControl>
                <EyeLidSelect placeholder={"Mucosa Appearance"} type={type} value={field.value} onChange={field.onChange} />
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
