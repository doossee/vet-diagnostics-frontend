import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { RegionSelect } from "../regions/components/region-select";
import { DistrictSelect } from "../districts/components/district-select";
import { VetStationSchema, createVetStationSchema, vetStationValues } from "./vetstations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

interface VetStationFormProps {
  defaultValues?: VetStationSchema;
  onSubmit: (values: VetStationSchema) => void;
}

export function VetStationForm({ onSubmit, defaultValues }: VetStationFormProps) {
  const { t } = useI18n();

  const form = useForm<VetStationSchema>({
    resolver: zodResolver(createVetStationSchema(t)),
    defaultValues: defaultValues || (vetStationValues as any),
  });

  const regionId = form.watch("regionId" as any);

  useEffect(() => {
    if (!defaultValues) return;

    form.setValue("regionId" as any, (defaultValues as any)?.district?.regionId);
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <FormField
          name="name_ru"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("regions.vetStationName")} RU</FormLabel>
              <FormControl>
                <Textarea placeholder={t("regions.vetStationName")} {...field} rows={2} />
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
              <FormLabel>{t("regions.vetStationName")} UZ</FormLabel>
              <FormControl>
                <Textarea placeholder={t("regions.vetStationName")} {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("regions.vetStationAddress")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("regions.vetStationAddress")} {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={"regionId" as any}
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

        <FormField
          name="districtId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.districtName")}</FormLabel>
              <FormControl>
                <DistrictSelect placeholder={t("form.districtName")} value={field.value} onChange={field.onChange} regionId={regionId??null} disabled={!regionId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: edit district id not selected */}

        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
