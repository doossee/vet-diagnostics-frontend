import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LanguageLocales, UrineTest } from "@/shared/types";
import { SMELL_TYPES, CLARITY_TYPES } from "@/shared/constants";

export const createUrineTestColumns = (handleEditItem: (item: UrineTest) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: UrineTest) {
      return item.animal?.nameOrCode;
    },
  },
  { title: t("inspections.consistency"), key: "consistency" },
  {
    title: t("inspections.smell"),
    key: "smell",
    render(item: UrineTest) {
      return SMELL_TYPES[item.smell][locale];
    },
  },
  {
    title: t("inspections.clarity"),
    key: "clarity",
    render(item: UrineTest) {
      return CLARITY_TYPES[item.clarity][locale];
    },
  },
  {
    title: t("form.color"),
    key: "color",
    render(item: UrineTest) {
      return item.color?.name;
    },
  },
  {
    title: t("form.disease"),
    key: "disease",
    render(item: UrineTest) {
      return `${new Date(item.disease?.startTime!).toLocaleDateString()}-${new Date(item.disease?.endTime!).toLocaleDateString()}`;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: UrineTest) {
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
