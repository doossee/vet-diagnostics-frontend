import { Edit, Trash } from "lucide-react";
import { LanguageLocales, VetStation } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createVetStationColumns = (handleEditItem: (item: VetStation) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("regions.vetStationName"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  { title: t("regions.vetStationAddress"), key: "address" },
  {
    title: t("form.districtName"),
    key: "district",
    render(item: VetStation) {
      return item?.district?.name?.[locale];
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
