import { Color, LanguageLocales } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const createAnimalColorColumns = (handleEditItem: (item: Color) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("management.colorName"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Color) {
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
