import { FecesColor } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createDungColorColumns = (handleEditItem: (item: FecesColor) => void, handleDelete: (id: string) => void, t: any) => [
  { title: t("management.colorName")+" RU", key: "name_ru" },
  { title: t("management.colorName")+" UZ", key: "name_uz" },
  {
    title: "Animal type",
    key: "animalType",
    render(item: FecesColor) {
      return item?.animalType?.name_ru
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: FecesColor) {
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
