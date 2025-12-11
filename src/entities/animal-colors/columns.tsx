import { Color } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const createAnimalColorColumns = (handleEditItem: (item: Color) => void, handleDelete: (id: string) => void, t: any) => [
  { title: t("management.colorName")+" RU", key: "name_ru" },
  { title: t("management.colorName")+" UZ", key: "name_uz" },
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
