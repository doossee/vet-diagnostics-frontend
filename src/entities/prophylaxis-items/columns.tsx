import { Edit, Trash } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { LanguageLocales, ProphylaxisItem } from "@/shared/types";
import { PROPHYLAXIS_TYPES, PROPHYLAXIS_BADGE_COLORS } from "../prophylaxis/utils/constants/prophylaxis-types";

export const createProphylaxisItemsColumns = (handleEditItem: (item: ProphylaxisItem) => void, handleDelete: (id: number | string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("inspections.itemName"), key: `name_${locale}`
  },
  {
    title: t("inspections.specificProphylaxis"), key: "type", render(item: ProphylaxisItem) {
      return <Badge className="text-sm" variant={PROPHYLAXIS_BADGE_COLORS[item.type] as any}>
        {PROPHYLAXIS_TYPES[item.type]?.[locale]}
      </Badge>
    }
  },
  {
    title: t("form.date"), key: "date", render(item: ProphylaxisItem) {
      return new Date(item.createdAt).toLocaleDateString()
    }
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    render(item: ProphylaxisItem) {
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
