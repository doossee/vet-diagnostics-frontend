// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlaskConical, Microscope, ScanSearch } from "lucide-react";

import { useI18n } from "@/shared/hooks/use-i18n";
import { Input } from "@/shared/components/ui/input";
import { Divider } from "@/shared/components/divider";
import { Button } from "@/shared/components/ui/button";
// import { AnimalSelect } from "../animals/components/animal-select";
import { UrineColorSelect } from "../urine-colors/components/urine-color-select";
import { UrineSmellsSelect } from "../additional-crud/components/urine-smells-select";
import { UrineClaritiesSelect } from "../additional-crud/components/urine-clarities-select";
import { UrineTestSchema, createUrineTestSchema, urineTestValues } from "./urine-test.model";
import { UrineConsistenciesSelect } from "../additional-crud/components/urine-consistencies-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";

interface UrineTestFormProps {
  defaultValues?: UrineTestSchema;
  onSubmit: (values: UrineTestSchema) => void;
}

export function UrineTestForm({ onSubmit, defaultValues }: UrineTestFormProps) {
  const { t } = useI18n();

  const form = useForm<UrineTestSchema>({
    resolver: zodResolver(createUrineTestSchema(t)),
    defaultValues: defaultValues || (urineTestValues as any),
  });

  // const animalTypeId = form.watch("animalTypeId" as any);

  // useEffect(() => {
  //   if (defaultValues) form.setValue("animalTypeId" as any, (defaultValues as any)?.animal?.animalTypeId);
  // }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* <FormField
          name="animalId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.animal")}</FormLabel>
              <FormControl>
                <AnimalSelect placeholder={t("form.animal")} value={field.value} onChange={field.onChange} typeId={animalTypeId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          name="urineColorId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.color")}</FormLabel>
              <FormControl>
                <UrineColorSelect placeholder={t("form.color")} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Divider label="Макроскопическое исследование" icon={<ScanSearch />} className="col-span-1 md:col-span-2" />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Количество"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Количество"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="urineClarityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Прозрачность"}</FormLabel>
              <FormControl>
                <UrineClaritiesSelect placeholder={"Прозрачность"} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="urineConsistencyId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Консистенция"}</FormLabel>
              <FormControl>
                <UrineConsistenciesSelect placeholder={"Консистенция"} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="urineSmellId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Запах"}</FormLabel>
              <FormControl>
                <UrineSmellsSelect placeholder={"Запах"} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Divider label="Микроскопическое исследование" icon={<Microscope />} className="col-span-1 md:col-span-2" />

        <FormField
          name="leukocytes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Лейкоциты"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Лейкоциты"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="epithelium"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Эпителий"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Эпителий"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="microbialBodies"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Микробные тела"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Микробные тела"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="erythrocytes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Эритроциты"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Эритроциты"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="saltCrystals"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Кристаллы солей"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Кристаллы солей"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Divider label="Лабораторное исследование" icon={<FlaskConical />} className="col-span-1 md:col-span-2" />

        <FormField
          name="ph"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Среда (pH)"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Среда (pH)"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="acetone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Кетоновые тела (ацетон)"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Кетоновые тела (ацетон)"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="protein"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Белок"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Белок"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="bilirubin"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Билирубин"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Билирубин"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="urobilinogen"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Уробилиноген"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Уробилиноген"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="sugar"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 pt-1.5">
              <FormLabel>{"Сахар"}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={"Сахар"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {t(form.formState.isSubmitting ? "form.submitting" : "form.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
