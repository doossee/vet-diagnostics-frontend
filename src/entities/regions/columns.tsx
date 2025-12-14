import { LanguageLocales, Region } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createRegionColumns = (handleEditItem: (item: Region) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  { title: t("form.regionName"), key: `name_${locale}` },
  {
    title: t("regions.countOfDistricts"),
    key: "districts",
    render(item: Region) {
      return item.districts?.length || 0;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    hideTitleInMobile: true,
    render(item: Region) {
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
