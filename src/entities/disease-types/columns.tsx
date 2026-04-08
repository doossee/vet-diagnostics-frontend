import { Edit, Trash } from "lucide-react";
import { DiseaseCategory, LanguageLocales } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createDiseaseTypeColumns = (handleEditItem: (item: DiseaseCategory) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("inspections.diseaseTypeName"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  {
    title: t("inspections.parentDiseaseType"),
    key: "parent",
    render(item: DiseaseCategory) {
      return item.parent ? item.parent?.name?.[locale] : '-'
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: DiseaseCategory) {
      return (
        <div className="flex gap-2 items-start! flex-wrap md:flex-nowrap justify-end md:justify-start">
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
