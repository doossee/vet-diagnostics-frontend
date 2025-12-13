import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { AdditionalCrudModel, LanguageLocales } from "@/shared/types";

export const createAdditionalCrudColumns = (handleEditItem: (item: AdditionalCrudModel) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  { title: t("management.colorName"), key: `name_${locale}` },
  {
    title: "Animal type",
    key: "animalType",
    render(item: AdditionalCrudModel) {
      return item?.animalType?.[`name_${locale}`]
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: AdditionalCrudModel) {
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
