import { Edit, Trash } from "lucide-react";
import { Inspection, LanguageLocales } from "@/shared/types";
import { INSPECTION_TYPES } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";

export const createInspectionColumns = (handleEditItem: (item: Inspection) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: Inspection) {
      return <span className="text-right">{item.animal?.nameOrCode ?? "-"}</span>;
    },
  },
  { title: t("inspections.pulse"), key: "pulse" },
  { title: t("inspections.rumination"), key: "rumination" },
  { title: t("inspections.temperature"), key: "temperature" },
  { title: t("inspections.respiratoryRate"), key: "respiratoryRate" },
  {
    title: t("inspections.inspectionType"),
    key: "type",
    render(item: any) {
      return INSPECTION_TYPES[item.type as keyof typeof INSPECTION_TYPES][locale];
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Inspection) {
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
