import { Disease } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createDiseaseColumns = (handleEditItem: (item: Disease) => void, handleDelete: (id: string) => void, t: any) => [
  { title: "Name Ru", key: "name_ru" },
  { title: "Name Uz", key: "name_uz" },
  {
    title: "Category",
    key: "diseaseCategory",
    render(item: Disease) {
      return item?.diseaseCategory?.name_ru;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Disease) {
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
