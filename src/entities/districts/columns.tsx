import { District, LanguageLocales } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const createDistrictColumns = (handleEditItem: (item: District) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  { title: t("form.districtName"), key: `name_${locale}` },
  {
    title: t("form.regionName"),
    key: "region",
    render(item: District) {
      return item.region?.[`name_${locale}`];
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
