import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { GeneralInspection, LanguageLocales } from "@/shared/types";
import { OBESITY_TYPES, POSITIONS, BODY_TYPES, CUSTOMER_TYPES, BODY_STRUCTURES } from "@/shared/constants";

export const createGeneralInspectionColums = (handleEditItem: (item: GeneralInspection) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: GeneralInspection) {
      return <span className="text-right">{item.animal.nameOrCode}</span>;
    },
  },
  {
    title: t("inspections.obesity"),
    key: "obesity",
    render(item: GeneralInspection) {
      return <span className="text-right">{OBESITY_TYPES[item.obesity][locale]}</span>;
    },
  },
  {
    title: t("inspections.bodyType"),
    key: "bodyType",
    render(item: GeneralInspection) {
      return <span className="text-right">{BODY_TYPES[item.bodyType][locale]}</span>;
    },
  },
  {
    title: t("inspections.bodyStructure"),
    key: "bodyStructure",
    render(item: GeneralInspection) {
      return <span className="text-right">{BODY_STRUCTURES[item.bodyStructure][locale]}</span>;
    },
  },
  {
    title: t("inspections.bodyPosition"),
    key: "bodyPosition",
    render(item: GeneralInspection) {
      return <span className="text-right">{POSITIONS[item.bodyPosition][locale]}</span>;
    },
  },
  {
    title: t("inspections.customerType"),
    key: "customerType",
    render(item: GeneralInspection) {
      return <span className="text-right">{CUSTOMER_TYPES[item.character][locale]}</span>;
    },
  },
  {
    title: t("form.color"),
    key: "color",
    render(item: GeneralInspection) {
      return <span className="text-right">{item.color?.name}</span>;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: GeneralInspection) {
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
