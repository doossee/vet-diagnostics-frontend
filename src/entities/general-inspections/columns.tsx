import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ClinicalExam, LanguageLocales } from "@/shared/types";
import { DOWN_TYPE, FEATHER_TYPE, HAIR_TYPE, WOOL_TYPE } from "@/entities/general-inspections/utils/constants/skin-cover";
import { SKIN_COLOR, SKIN_ELASTICITY, SKIN_HUMIDITY, SKIN_TEMP } from "@/entities/general-inspections/utils/constants/skin";
import { BODY_POSITION, BODY_TYPE, CONSTITUTION, OBESITY_TYPE, TEMPERAMENT } from "@/entities/general-inspections/utils/constants/habitus";
import { LYMPH_CONSISTENCY, LYMPH_MOBILITY, LYMPH_PAIN, LYMPH_SHAPE, LYMPH_SIZE, LYMPH_SURFACE, LYMPH_TEMP } from "@/entities/general-inspections/utils/constants/lymph";

export const createGeneralInspectionColumns = (handleEditItem: (item: ClinicalExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.animal?.animalNameCode}</span>;
    },
  },

  // Общее состояние
  { title: t("inspections.pulse"), key: "pulse" },
  { title: t("inspections.rumination"), key: "rumination" },
  { title: t("inspections.temperature"), key: "temperature" },
  { title: t("inspections.respiratoryRate"), key: "respiratoryRate" },
  
  // Габитус (телосложение)
  {
    title: t("inspections.obesity"),
    key: "obesity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.obesity ? OBESITY_TYPE[item.obesity][locale] : "-"}</span>;
    },
  },
  {
    title: t("inspections.bodyType"),
    key: "bodyType",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.bodyType ? BODY_TYPE[item.bodyType][locale] : "-"}</span>;
    },
  },
  {
    title: t("inspections.bodyPosition"),
    key: "bodyPosition",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.bodyPosition ? BODY_POSITION[item.bodyPosition][locale] : "-"}</span>;
    },
  },
  {
    title: "Constitution",
    key: "bodyStructure",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.constitution ? CONSTITUTION[item.constitution][locale] : "-"}</span>;
    },
  },
  {
    title: "Temperament",
    key: "customerType",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.temperament ? TEMPERAMENT[item.temperament][locale] : "-"}</span>;
    },
  },

  // Кожный покров
  {
    title: "Wool",
    key: "wool",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.wool ? WOOL_TYPE[item.wool][locale] : "-"}</span>;
    },
  },
  {
    title: "Down",
    key: "down",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.down ? DOWN_TYPE[item.down][locale] : "-"}</span>;
    },
  },
  {
    title: "Hair",
    key: "hair",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.hair ? HAIR_TYPE[item.hair][locale] : "-"}</span>;
    },
  },
  {
    title: "Feathers",
    key: "feathers",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.feathers ? FEATHER_TYPE[item.feathers][locale] : "-"}</span>;
    },
  },
 
  // Кожа
  {
    title: "Skin Color",
    key: "skinColor",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinColor ? SKIN_COLOR[item.skinColor][locale] : "-"}</span>;
    },
  },
  {
    title: "Skin Humidity",
    key: "skinHumidity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinHumidity ? SKIN_HUMIDITY[item.skinHumidity][locale] : "-"}</span>;
    },
  },
  { title: "Skin Smell", key: "skinSmell" },
  {
    title: "Skin Temp",
    key: "skinTemp",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinTemp ? SKIN_TEMP[item.skinTemp][locale] : "-"}</span>;
    },
  },
  { title: "Skin Surface", key: "skinSurface" },
  {
    title: "Skin Elasticity",
    key: "skinElasticity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinElasticity ? SKIN_ELASTICITY[item.skinElasticity][locale] : "-"}</span>;
    },
  },
  { title: "Skin Sensitivity", key: "skinSensitivity" },
  { title: "Skin Pain", key: "skinPain" },

  // Лимфатические узлы
  {
    title: "Lymph Size",
    key: "lymphSize",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphSize ? LYMPH_SIZE[item.lymphSize][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Shape",
    key: "lymphShape",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphShape ? LYMPH_SHAPE[item.lymphShape][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Surface",
    key: "lymphSurface",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphSurface ? LYMPH_SURFACE[item.lymphSurface][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Consistency",
    key: "lymphConsistency",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphConsistency ? LYMPH_CONSISTENCY[item.lymphConsistency][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Temp",
    key: "lymphTemp",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphTemp ? LYMPH_TEMP[item.lymphTemp][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Pain",
    key: "lymphPain",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphPain ? LYMPH_PAIN[item.lymphPain][locale] : "-"}</span>;
    },
  },
  {
    title: "Lymph Mobility",
    key: "lymphMobility",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphMobility ? LYMPH_MOBILITY[item.lymphMobility][locale] : "-"}</span>;
    },
  },


  {
    title: t("table.actions"),
    key: "actions",
    render(item: ClinicalExam) {
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
