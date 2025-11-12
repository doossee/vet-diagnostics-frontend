"use client";

import { useEffect } from "react";
import { User } from "@/shared/types";
import { useForm } from "react-hook-form";
import { GENDERS } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { DatePicker } from "@/shared/components/date-picker";
import { UserSchema, createUserSchema, userValues } from "./user.model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RegionSelect } from "../regions/components/region-select";
import { VeterinarianSelect } from "./components/veterinarian-select";
import { DistrictSelect } from "../districts/components/district-select";

interface UserFormProps {
  itemId?: number | null;
  defaultValues?: UserSchema;
  showVeterinarians?: boolean;
  onSubmit: (values: UserSchema) => void;
}

export function UserForm({ onSubmit, showVeterinarians, itemId, defaultValues }: UserFormProps) {
  const { t, locale } = useI18n();

  const form = useForm<UserSchema>({
    resolver: zodResolver(createUserSchema(t, itemId!)),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          password: "",
          confirmPassword: "",
          birthDate: new Date(defaultValues.birthDate),
        }
      : (userValues as any),
  });

  const regionId = form.watch("regionId" as any);
  const districtId = form.watch("districtId");

  useEffect(() => {
    if (!defaultValues) return;

    form.setValue("regionId" as any, (defaultValues as any)?.district?.regionId);
  }, [defaultValues]);

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
            name="middleName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("users.middleName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("users.middleName")} {...field} />
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
                <FormLabel>{t("form.address")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.address")} {...field} />
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
                  <Input maxLength={13} placeholder="+998 00 000 00 00" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="gender"
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
                      {GENDERS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g[locale]}
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
            name="birthDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col pt-1.5 gap-1">
                <FormLabel>{t("form.birthDate")}</FormLabel>
                <FormControl>
                  <DatePicker field={field} />
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
          
          {showVeterinarians && <FormField
            name="veterinarianId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.veterinarian")}</FormLabel>
                <FormControl>
                  <VeterinarianSelect value={field.value} onChange={field.onChange} placeholder={t("form.veterinarian")} districtId={districtId??null} disabled={!districtId} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

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
              </FormItem>
            )}
          />
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
