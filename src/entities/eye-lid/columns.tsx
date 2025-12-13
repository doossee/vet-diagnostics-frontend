import { Edit, Trash } from "lucide-react";
import { MucosaAppearance } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { MUCOSA_TYPES } from "./utils/constants/mucosa-types";

export const createEyeLidColumns = (handleEditItem: (item: MucosaAppearance) => void, handleDelete: (id: string) => void, t: any) => [
  { title: t("management.eyeLidName"), key: "name_ru" },
  { title: t("management.eyeLidName"), key: "name_uz" },
  {
    title: t("management.eyeLidName"),
    key: "mucosaType",
    render(item: MucosaAppearance) {
      return MUCOSA_TYPES?.[item.mucosaType]?.ru
    }
  },
  {
    title: t("management.eyeLidName"),
    key: "animalType",
    render(item: MucosaAppearance) {
      return item.animalType?.name_ru
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: MucosaAppearance) {
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
