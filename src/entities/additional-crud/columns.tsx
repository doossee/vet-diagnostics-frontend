import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { AdditionalCrudModel, LanguageLocales } from "@/shared/types";

export const createAdditionalCrudColumns = (handleEditItem: (item: AdditionalCrudModel) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
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
    render(item: AdditionalCrudModel) {
      return item?.animalType?.name?.[locale]
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: AdditionalCrudModel) {
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
