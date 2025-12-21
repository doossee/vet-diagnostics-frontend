import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { ProphylaxisSchema, createProphylaxisSchema, prophylaxisValues } from "./prophylaxis.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { PROPHYLAXIS_TYPES } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { DatePicker } from "@/shared/components/date-picker";
// import { AnimalSelect } from "../animals/components/animal-select";
import { ProphylaxisItemSelect } from "../prophylaxis-items/components/prophylaxis-item-select";
import { ProphylaxisDetailSelect } from "../prophylaxis-details/components/prophylaxis-detail-select";
import { ObjectEntriesSelect } from "@/shared/components/object-entries-select";

interface ProphylaxisFormProps {
  defaultValues?: ProphylaxisSchema;
  onSubmit: (values: ProphylaxisSchema) => void;
}

export function ProphylaxisForm({ onSubmit, defaultValues }: ProphylaxisFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<ProphylaxisSchema>({
    resolver: zodResolver(createProphylaxisSchema(t)),
    defaultValues: defaultValues || prophylaxisValues,
  });

  const type = form.watch("type");
  const itemId = form.watch("itemId");

  // TODO: change type or item remove child

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <ObjectEntriesSelect
          name="type"
          form={form}
          locale={locale}
          object={PROPHYLAXIS_TYPES}
          label={t("inspections.specificProphylaxis")}
          placeholder={t("inspections.specificProphylaxis")}
        />
        {type && <FormField
          name={"itemId"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.prophylaxisItem")}</FormLabel>
              <FormControl>
                <ProphylaxisItemSelect placeholder={t("inspections.prophylaxisItem")} value={field.value} onChange={field.onChange} type={type} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        {itemId && <FormField
          name={"detailId"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inspections.prophylaxisDetail")}</FormLabel>
              <FormControl>
                <ProphylaxisDetailSelect placeholder={t("inspections.prophylaxisDetail")} value={field.value} onChange={field.onChange} itemId={itemId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col pt-1.5 gap-1">
              <FormLabel>{t("form.date")}</FormLabel>
              <FormControl>
                <DatePicker field={field} />
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
