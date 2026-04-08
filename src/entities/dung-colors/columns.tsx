import { FecesColor, LanguageLocales } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createDungColorColumns = (handleEditItem: (item: FecesColor) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("inspections.name"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  {
    title: t("animals.animalType"),
    key: "animalType",
    render(item: FecesColor) {
      return item?.animalType?.name?.[locale]
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
