import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { ClinicalExam, LanguageLocales } from "@/shared/types";
import { SessionCell } from "@/shared/components/session-cell";
// import { DOWN_TYPE, FEATHER_TYPE, HAIR_TYPE, WOOL_TYPE } from "@/entities/general-inspections/utils/constants/skin-cover";
// import { SKIN_COLOR, SKIN_ELASTICITY, SKIN_HUMIDITY, SKIN_TEMP } from "@/entities/general-inspections/utils/constants/skin";
// import { BODY_POSITION, BODY_TYPE, CONSTITUTION, OBESITY_TYPE, TEMPERAMENT } from "@/entities/general-inspections/utils/constants/habitus";
// import { LYMPH_CONSISTENCY, LYMPH_MOBILITY, LYMPH_PAIN, LYMPH_SHAPE, LYMPH_SIZE, LYMPH_SURFACE, LYMPH_TEMP } from "@/entities/general-inspections/utils/constants/lymph";

export const createGeneralInspectionColumns = (handleEditItem: (item: ClinicalExam) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.animal"),
    key: "animal",
    hideInInfoTable: true,
    render(item: ClinicalExam) {
      return <span className="text-right">{item.animal?.animalNameCode}</span>;
    },
  },
  {
    title: t("sessions.session"),
    key: "session",
    hideInInfoTable: true,
    render(item: ClinicalExam) {
      if (!item.session) return <span className="text-muted-foreground text-sm">—</span>;
      return <SessionCell session={item.session} />;
    },
  },

  { title: t("inspections.pulse"), key: "pulse" },
  { title: t("inspections.rumination"), key: "rumination" },
  { title: t("inspections.temperature"), key: "temperature" },
  { title: t("inspections.respiratoryRate"), key: "respiratoryRate" },
  
  {
    title: t("inspections.obesity"),
    key: "obesity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.obesity?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.bodyType"),
    key: "bodyType",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.bodyType?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.bodyPosition"),
    key: "bodyPosition",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.bodyPosition?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.constitution"),
    key: "bodyStructure",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.constitution?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.temperament"),
    key: "customerType",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.temperament?.name?.[locale] ?? "-"}</span>;
    },
  },

  {
    title: t("inspections.wool"),
    key: "wool",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.wool?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.down"),
    key: "down",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.down?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.hair"),
    key: "hair",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.hair?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.feathers"),
    key: "feathers",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.feathers?.name?.[locale] ?? "-"}</span>;
    },
  },
 
  {
    title: t("inspections.skinColor"),
    key: "skinColor",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinColor?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinHumidity"),
    key: "skinHumidity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinHumidity?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinSmell"),
    key: "skinSmell",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinSmell?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinTemp"),
    key: "skinTemp",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinTemp?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinSurface"),
    key: "skinSurface",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinSurface?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinElasticity"),
    key: "skinElasticity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinElasticity?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinSensitivity"),
    key: "skinSensitivity",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinSensitivity?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.skinPain"),
    key: "skinPain",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.skinPain?.name?.[locale] ?? "-"}</span>;
    },
  },

  {
    title: t("inspections.lymphSize"),
    key: "lymphSize",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphSize?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphShape"),
    key: "lymphShape",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphShape?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphSurface"),
    key: "lymphSurface",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphSurface?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphConsistency"),
    key: "lymphConsistency",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphConsistency?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphTemp"),
    key: "lymphTemp",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphTemp?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphPain"),
    key: "lymphPain",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphPain?.name?.[locale] ?? "-"}</span>;
    },
  },
  {
    title: t("inspections.lymphMobility"),
    key: "lymphMobility",
    render(item: ClinicalExam) {
      return <span className="text-right">{item.lymphMobility?.name?.[locale] ?? "-"}</span>;
    },
  },

  // { title: t("inspections.rumenInfusoriaCount"), key: "rumenInfusoriaCount" },
  // { title: t("inspections.rumenFluidState"), key: "rumenFluidState" },
  
  {
    title: t("table.actions"),
    key: "actions",
    hideInInfoTable: true,
    render(item: ClinicalExam) {
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
  }
];
