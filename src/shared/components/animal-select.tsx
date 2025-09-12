"use client";

import { useState } from "react";
import { useI18n } from "../hooks/use-i18n";
import { useAnimals, useAnimalTypes } from "@/shared/hooks/queries";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface AnimalSelectProps {
  form: any;
}

export function AnimalSelect({ form }: AnimalSelectProps) {
  const { t } = useI18n();
  const [typeId, setTypeId] = useState<number | null>(null);

  const { animalTypes } = useAnimalTypes();
  const { animals } = useAnimals({ typeId });

  return (
    <>
      <div className="grid gap-2">
        <FormLabel>{t("animals.animalType")}</FormLabel>
        <Select value={typeId ? String(typeId) : ""} onValueChange={(e) => setTypeId(+e)}>
          <SelectTrigger>
            <SelectValue placeholder={t("animals.animalType")} />
          </SelectTrigger>
          <SelectContent>
            {animalTypes.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FormField
        name="animalId"
        control={form.control}
        render={({ field: { value, onChange, ...others } }) => (
          <FormItem>
            <FormLabel>{t("form.animal")}</FormLabel>
            <FormControl>
              <Select disabled={animals.length === 0} value={value ? String(value) : ""} onValueChange={(e) => onChange(+e)} {...others}>
                <SelectTrigger>
                  <SelectValue placeholder={t("form.animal")} />
                </SelectTrigger>
                <SelectContent>
                  {animals.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.nameOrCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
