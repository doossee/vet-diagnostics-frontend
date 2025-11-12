import { Edit, Trash } from "lucide-react";
import { LeatherCover } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createLeatherCoverColumns = (handleEditItem: (item: LeatherCover) => void, handleDelete: (id: number) => void, t: any) => [
  { title: t("management.leatherCoverName"), key: "name" },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: LeatherCover) {
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
