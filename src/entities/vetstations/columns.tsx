import { Edit, Trash } from "lucide-react";
import { VetStation } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createVetStationColums = (handleEditItem: (item: VetStation) => void, handleDelete: (id: number) => void, t: any) => [
  { title: t("regions.vetStationName"), key: "name" },
  { title: t("regions.vetStationAddress"), key: "address" },
  {
    title: t("form.districtName"),
    key: "district",
    render(item: VetStation) {
      return item?.district?.name;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: VetStation) {
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
