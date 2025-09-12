import { AnimalType } from "@/shared/types";
import { Trash, Edit } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createAnimalTypeColums = (handleEditItem: (item: AnimalType) => void, handleDelete: (id: number) => void, t: any) => [
  { title: t("animalTypes.name"), key: "name" },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: AnimalType) {
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
