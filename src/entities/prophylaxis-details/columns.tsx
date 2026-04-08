import { Edit, Trash } from "lucide-react";

import { LanguageLocales, ProphylaxisDetail } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createProphylaxisDetailsColumns = (handleEditItem: (item: ProphylaxisDetail) => void, handleDelete: (id: number | string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("inspections.name"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  {
    title: t("form.type"), key: "item", render(item: ProphylaxisDetail) {
      return item?.item?.name?.[locale]
    }
  },
  {
    title: t("form.date"), key: "date", render(item: ProphylaxisDetail) {
      return new Date(item.createdAt).toLocaleDateString()
    }
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    render(item: ProphylaxisDetail) {
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
