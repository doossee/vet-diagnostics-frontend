import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { FecesExam, LanguageLocales } from "@/shared/types";

export const createDungTestColumns = (handleEditItem: (item: FecesExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    hideInInfoTable: true,
    title: t("form.animal"),
    key: "animal",
    render(item: FecesExam) {
      return item.animal?.animalNameCode;
    },
  },
  { title: t("inspections.amount"), key: "amount" },
  { title: t("inspections.undigestedFood"), key: "undigestedFood" },
  {
    title: t("inspections.smell"),
    key: "smell",
    render(item: FecesExam) {
      return item.fecesSmell?.name?.[locale] ?? "-";
    },
  },
  {
    title: t("inspections.consistency"),
    key: "clarity",
    render(item: FecesExam) {
      return item.fecesConsistency?.name?.[locale] ?? "-";
    },
  },
  {
    title: t("form.color"),
    key: "color",
    render(item: FecesExam) {
      return item.fecesColor?.name?.[locale] ?? "-";
    },
  },
  {
    title: t("inspections.form"),
    key: "form",
    render(item: FecesExam) {
      return item.fecesForm?.name?.[locale] ?? "-";
    },
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    render(item: FecesExam) {
      return (
        <div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
          <CopyIdButton id={item.id} />
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
