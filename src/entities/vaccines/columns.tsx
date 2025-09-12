import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LanguageLocales, Vaccine } from "@/shared/types";

export const createVaccineColums = (handleEditItem: (item: Vaccine) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    sorting: "byAnimalId",
    render(item: Vaccine) {
      return <span className="text-right">{item?.animal?.nameOrCode}</span>;
    },
  },
  {
    title: t("management.vaccineType"),
    key: "type",
    sorting: "byTypeId",
    render(item: Vaccine) {
      return <span className="text-right">{item?.type?.name}</span>;
    },
  },
  {
    title: t("form.date"),
    key: "date",
    sorting: "byDate",
    render(item: Vaccine) {
      return new Date(item.date).toLocaleDateString();
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: Vaccine) {
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
