import { Edit, Trash } from "lucide-react";
import { BloodExam } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { LanguageLocales } from "@/shared/types";
import { BLOOD_TEST_FIELDS } from "@/entities/general-blood-tests/utils/constants/blood-test-fields";

export const createGeneralBloodTestColumns = (handleEditItem: (item: BloodExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: BloodExam) {
      return item.animal?.animalNameCode;
    },
  },
  {
    title: t("form.date"),
    key: "date",
    render(item: BloodExam) {
      return new Date(item.createdAt).toLocaleDateString();
    },
  },
  ...Object.entries(BLOOD_TEST_FIELDS).map(([key, value]) => ({
    key,
    title: value[locale],
    render: (item: BloodExam) => {
      return <span className="text-right">{item[key as keyof BloodExam] + " " + value[`unit_${locale}`]}</span>;
    },
  })),
  { title: t("inspections.conclusion"), key: "conclusion" },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: BloodExam) {
      return (
        <div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
          <Button onClick={() => handleEditItem(item)} size="sm" className="text-xs!">
            <Edit />
            {t("table.edit")}
          </Button>
          <Button onClick={() => handleDelete(item.id)} size="sm" className="text-xs!" variant={"destructive"}>
            <Trash />
            {t("table.delete")}
          </Button>
        </div>
      );
    },
  },
];
