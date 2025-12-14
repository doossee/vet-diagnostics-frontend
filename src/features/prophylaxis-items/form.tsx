import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
// import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";
import { PROPHYLAXIS_TYPES } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ProphylaxisItemSchema, createProphylaxisItemSchema, prophylaxisItemValues } from "./prophylaxis-item.model";

interface FormProps {
  defaultValues?: ProphylaxisItemSchema;
  onSubmit: (values: ProphylaxisItemSchema) => void;
}

export function ProphylaxisItemsForm({ onSubmit, defaultValues }: FormProps) {
  const { t } = useI18n();

  const form = useForm<ProphylaxisItemSchema>({
    resolver: zodResolver(createProphylaxisItemSchema(t)),
    defaultValues: defaultValues || prophylaxisItemValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name_ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Называние элемента RU</FormLabel>
              <FormControl>
                <Textarea placeholder={"Называние элемента"} {...field} rows={3} />
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
              <FormLabel>{"Называние элемента"} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={"Называние элемента"} {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.specificProphylaxis")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inspections.specificProphylaxis")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROPHYLAXIS_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
