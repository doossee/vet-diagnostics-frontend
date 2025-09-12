import { District } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createDistrictColums = (handleEditItem: (item: District) => void, handleDelete: (id: number) => void, t: any) => [
  { title: t("form.districtName"), key: "name" },
  {
    title: t("form.regionName"),
    key: "region",
    render(item: District) {
      return item.region?.name;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: District) {
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
