import { Disease, LanguageLocales } from "@/shared/types";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";

export const createDiseaseColumns = (handleEditItem: (item: Disease) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("inspections.diseaseName"),
    key: "name",
    render(item) {
      return item.name?.[locale] ?? "-";
    },
  },
  // { title: "Name Uz", key: "name_uz" },
  {
    title: t("inspections.diseases"),
    key: "diseaseCategory",
    render(item: Disease) {
      return item?.diseaseCategory?.name?.[locale];
    },
  },
  {
    title: t("form.date"),
    key: "date",
    render(item: Disease) {
      return new Date(item.createdAt).toLocaleString()
    }
  },
  {
    title: t("table.actions"),
    key: "actions",
    hideInInfoTable: true,
    render(item: Disease) {
      return (
        <div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
          <CopyIdButton id={item.id} />
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
