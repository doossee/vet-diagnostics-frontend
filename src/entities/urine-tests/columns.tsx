import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { LanguageLocales, UrineExam } from "@/shared/types";
import { SessionCell } from "@/shared/components/session-cell";

export const createUrineTestColumns = (handleEditItem: (item: UrineExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    hideInInfoTable: true,
    title: t("form.animal"),
    key: "animal",
    render(item: UrineExam) {
      return item.animal?.animalNameCode;
    },
  },
  {
    title: t("sessions.session"),
    key: "session",
    hideInInfoTable: true,
    render(item: UrineExam) {
      if (!item.session) return <span className="text-muted-foreground text-sm">—</span>;
      return <SessionCell session={item.session} />;
    },
  },
  {
    title: t("inspections.urineColor"),
    key: "urineColorId",
    render(item: UrineExam) {
      return item.urineColor?.name?.[locale] ?? '-';
    },
  },
  
  { title: t("inspections.amount"), key: "amount" },
  {
    title: t("inspections.clarity"),
    key: "urineClarityId",
    render(item: UrineExam) {
      return item.urineClarity?.name?.[locale] ?? '-';
    },
  },
  {
    title: t("inspections.consistency"),
    key: "urineConsistencyId",
    render(item: UrineExam) {
      return item.urineConsistency?.name?.[locale] ?? '-';
    },
  },
  {
    title: t("inspections.smell"),
    key: "urineSmellId",
    render(item: UrineExam) {
      return item.urineSmell?.name?.[locale] ?? '-';
    },
  },

  { title: t("inspections.ph"), key: "ph" },
  { title: t("inspections.acetone"), key: "acetone" },
  { title: t("inspections.protein"), key: "protein" },
  { title: t("inspections.bilirubin"), key: "bilirubin" },
  { title: t("inspections.urobilinogen"), key: "urobilinogen" },
  { title: t("inspections.sugar"), key: "sugar" },

  { title: t("inspections.leukocytes"), key: "leukocytes" },
  { title: t("inspections.epithelium"), key: "epithelium" },
  { title: t("inspections.microbialBodies"), key: "microbialBodies" },
  { title: t("inspections.erythrocytes"), key: "erythrocytes" },
  { title: t("inspections.saltCrystals"), key: "saltCrystals" },

  {
    title: t("form.date"),
    key: "createdAt",
    render(item: UrineExam) {
      return new Date(item.createdAt!).toLocaleDateString();
    },
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    render(item: UrineExam) {
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
