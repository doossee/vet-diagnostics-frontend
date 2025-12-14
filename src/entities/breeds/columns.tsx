import { Breed, LanguageLocales } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createBreedColumns = (handleEditItem: (item: Breed) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  { title: t("management.breedName"), key: `name_${locale}` },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Breed) {
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
