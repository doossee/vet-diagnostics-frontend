import { Edit, Trash } from "lucide-react";

import { Prophylaxis } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { PROPHYLAXIS_BADGE_COLORS, PROPHYLAXIS_TYPES } from "./utils/constants/prophylaxis-types";

export const createProphylaxisColumns = (handleEditItem: (item: Prophylaxis) => void, handleDelete: (id: number | string) => void, t: any) => [
  { title: "Животный", key: "animalId" },
  {
    title: "Специфическая профилактика", key: "type", render(item: Prophylaxis) {
      return <Badge className="text-sm" variant={PROPHYLAXIS_BADGE_COLORS[item.type] as any}>
        {PROPHYLAXIS_TYPES[item.type]}
      </Badge>
    }
  },
  {
    title: "Тип", key: "item", render(item: Prophylaxis) {
      return item?.item?.name_ru
    }
  },
  {
    title: "Дочерные", key: "detail", render(item: Prophylaxis) {
      return item?.detail?.name_ru
    }
  },
  {
    title: "Дата", key: "date", render(item: Prophylaxis) {
      return new Date(item.date).toLocaleDateString()
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Prophylaxis) {
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
