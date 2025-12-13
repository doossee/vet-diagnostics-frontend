import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LanguageLocales, UrineExam } from "@/shared/types";

export const createUrineTestColumns = (handleEditItem: (item: UrineExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    hideInInfoTable: true,
    title: "Животное",
    key: "animal",
    render(item: UrineExam) {
      return item.animal?.animalNameCode;
    },
  },
  {
    title: "Цвет мочи",
    key: "urineColorId",
    render(item: UrineExam) {
      return item.urineColor?.[`name_${locale}`] ?? '-';
    },
  },
  
  // Макроскопическое исследование
  { title: "Количество", key: "amount" },
  {
    title: "Прозрачность",
    key: "urineClarityId",
    render(item: UrineExam) {
      return item.urineClarity?.[`name_${locale}`] ?? '-';
    },
  },
  {
    title: "Консистенция",
    key: "urineConsistencyId",
    render(item: UrineExam) {
      return item.urineConsistency?.[`name_${locale}`] ?? '-';
    },
  },
  {
    title: "Запах",
    key: "urineSmellId",
    render(item: UrineExam) {
      return item.urineSmell?.[`name_${locale}`] ?? '-';
    },
  },

  // Лабораторное исследование
  { title: "Среда (pH)", key: "ph" },
  { title: "Кетоновые тела (ацетон)", key: "acetone" },
  { title: "Белок", key: "protein" },
  { title: "Билирубин", key: "bilirubin" },
  { title: "Уробилиноген", key: "urobilinogen" },
  { title: "Сахар", key: "sugar" },

  // Микроскопическое исследование
  { title: "Лейкоциты", key: "leukocytes" },
  { title: "Эпителий", key: "epithelium" },
  { title: "Микробные тела", key: "microbialBodies" },
  { title: "Эритроциты", key: "erythrocytes" },
  { title: "Кристаллы солей", key: "saltCrystals" },

  {
    title: "Дата",
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
