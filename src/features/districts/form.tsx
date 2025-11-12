import { Region } from "@/shared/types";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DistrictSchema, createDistrictSchema, districtValues } from "./districts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { RegionSelect } from "../regions/components/region-select";
import { Textarea } from "@/shared/components/ui/textarea";

interface DistrictFormProps {
  defaultValues?: DistrictSchema;
  onSubmit: (values: DistrictSchema) => void;
}

export function DistrictForm({ onSubmit, defaultValues }: DistrictFormProps) {
  const { t } = useI18n();

  const form = useForm<DistrictSchema>({
    resolver: zodResolver(createDistrictSchema(t)),
    defaultValues: defaultValues || (districtValues as any),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.districtName")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("form.districtName")} {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="regionId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.regionName")}</FormLabel>
              <FormControl>
                <RegionSelect placeholder={t("form.regionName")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-1">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
