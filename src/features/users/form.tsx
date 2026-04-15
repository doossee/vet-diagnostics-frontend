"use client";

import { useForm } from "react-hook-form";
import { useI18n } from "@/shared/hooks/use-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/shared/components/phone-input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { UserSchema, createUserSchema, userValues } from "./user.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { RegionSelect } from "../regions/components/region-select";
import { DistrictSelect } from "../districts/components/district-select";
import { Input } from "@/shared/components/ui/input";
import { VeterinarianSelect } from "./components/veterinarian-select";

interface UserFormProps {
  itemId?: string | null;
  defaultValues?: UserSchema;
  showVeterinarians?: boolean;
  onSubmit: (values: UserSchema) => void;
}

export function UserForm({ onSubmit, itemId, defaultValues, showVeterinarians }: UserFormProps) {
  const { t } = useI18n();

  const form = useForm<UserSchema>({
    resolver: zodResolver(createUserSchema(t, itemId!)),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          password: "",
          confirmPassword: "",
          regionId: (defaultValues as any)?.district?.regionId ?? (defaultValues as any)?.regionId,
        }
      : (userValues as any),
  });

  const regionId = form.watch("regionId" as any);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("users.firstName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("users.firstName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("users.lastName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("users.lastName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inspections.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("inspections.username")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inspections.email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("inspections.email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 pt-1.5">
                <FormLabel>{t("form.phone")}</FormLabel>
                <FormControl>
                  <PhoneInput value={field.value ?? ""} onChange={field.onChange} />
                </FormControl>
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
                  <RegionSelect placeholder={t("form.regionName")} value={(defaultValues as any)?.district?.region || field.value} onChange={field.onChange} />
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
                  <DistrictSelect placeholder={t("form.districtName")} value={(defaultValues as any)?.district || field.value} onChange={field.onChange} regionId={regionId} disabled={!regionId} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showVeterinarians && (
            <FormField
              name="veterinarianId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("nav.veterinarians")}</FormLabel>
                  <FormControl>
                    <VeterinarianSelect
                      placeholder={t("nav.veterinarians")}
                      value={(defaultValues as any)?.farmerProfile?.veterinarian?.user || field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!itemId?.trim() && <>
            <Separator className="col-span-1 md:col-span-2" />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 pt-1.5">
                  <FormLabel>{t("form.password")}</FormLabel>
                  <FormControl>
                    <Input required={itemId === null} type="password" placeholder={t("form.password")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"confirmPassword" as any}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 pt-1.5">
                  <FormLabel>{t("form.confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input required={itemId === null} type="password" placeholder={t("form.confirmPassword")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>}
        </div>
        <div className="flex-1 flex items-end">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
