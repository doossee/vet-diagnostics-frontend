import { Edit, Trash } from "lucide-react";
import { LanguageLocales, MucosaAppearance } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { MUCOSA_TYPES } from "./utils/constants/mucosa-types";

export const createEyeLidColumns = (handleEditItem: (item: MucosaAppearance) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("management.eyeLidName"),
    key: "name",
    render(item: MucosaAppearance) {
      return item.name?.[locale] ?? "-";
    },
  },
  {
    title: t("inspections.mucosaType"),
    key: "mucosaType",
    render(item: MucosaAppearance) {
      return item.mucosaType?.name?.[locale]
    }
  },
  {
    title: t("animals.animalType"),
    key: "animalType",
    render(item: MucosaAppearance) {
      return item.animalType?.name?.[locale]
    }
  },
  {
    title: t("inspections.numericValue"),
    key: "numericValue",
    render(item: MucosaAppearance) {
      return item.numericValue ?? "-"
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: MucosaAppearance) {
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
