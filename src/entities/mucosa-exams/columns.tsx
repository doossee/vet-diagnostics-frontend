import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { LanguageLocales, MucosaExam } from "@/shared/types";
import { MUCOSA_TYPES } from "../eye-lid/utils/constants/mucosa-types";

export const createMucosaExamColumns = (handleEditItem: (item: MucosaExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    hideInInfoTable: true,
    title: t("form.animal"),
    key: "animal",
    render(item: MucosaExam) {
      return item.animal?.animalNameCode
    }
  },
  {
    title: t("inspections.mucosaAppearance"),
    key: "mucosaAppearance",
    render(item: MucosaExam) {
      return item.mucosaAppearance?.name?.[locale]
    }
  },
  {
    title: t("inspections.mucosaType"),
    key: "mucosaType",
    render(item: MucosaExam) {
      return item.mucosaType?.name?.[locale]
    }
  },
  {
    title: t("form.date"),
    key: "date",
    render(item: MucosaExam) {
      return new Date(item.createdAt).toLocaleString()
    }
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    render(item: MucosaExam) {
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
