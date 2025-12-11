import { Edit, Trash } from "lucide-react";
import { DiseaseCategory } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createDiseaseTypeColumns = (handleEditItem: (item: DiseaseCategory) => void, handleDelete: (id: string) => void, t: any) => [
  { title: t("management.typeName")+" RU", key: "name_ru" },
  { title: t("management.typeName")+" UZ", key: "name_uz" },
  {
    title: "Parent",
    key: "parent",
    render(item: DiseaseCategory) {
      return item.parent ? item.parent.name_ru : '-'
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
