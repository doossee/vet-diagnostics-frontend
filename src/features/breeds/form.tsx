import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { BreedSelect } from "./components/breed-select";
import { BreedSchema, breedValues, createBreedSchema } from "./breed";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

interface BreedFormProps {
  defaultValues?: BreedSchema;
  onSubmit: (values: BreedSchema) => void;
}

export function BreedForm({ onSubmit, defaultValues }: BreedFormProps) {
  const { t } = useI18n();

  const form = useForm<BreedSchema>({
    resolver: zodResolver(createBreedSchema(t)),
    defaultValues: defaultValues || breedValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.breedName")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("management.breedName")} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("management.breedParent")}</FormLabel>
              <FormControl>
                <BreedSelect value={field.value} onChange={field.onChange} placeholder={t("management.breedParent")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submiting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
