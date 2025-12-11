import { Breed } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createBreedColumns = (handleEditItem: (item: Breed) => void, handleDelete: (id: number) => void, t: any) => [
  { title: t("management.breedName")+" RU", key: "name_ru" },
  { title: t("management.breedName")+" UZ", key: "name_uz" },
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
