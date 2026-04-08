import { Edit, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Animal, LanguageLocales } from "@/shared/types";
// import { ANIMAL_GENDERS } from "./utils/constants/animal-genders";

export const createAnimalColumns = (handleEditItem: (item: Animal) => void, handleDelete: (id: number | string) => void, t: any, locale: LanguageLocales) => [
  { title: t("animals.name"), key: "animalNameCode" },
  {
    title: t("animals.age"),
    key: "age",
    // sorting: "byBirthDate",
    render(item: Animal) {
      if (!item.birthDate) return "-";

      const birthDate = new Date(item.birthDate);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }
  },
  {
    title: t("form.type"),
    key: "type",
    // sorting: "byTypeId",
    render(item: Animal) {
      return item.animalType?.name?.[locale];
    },
  },
  {
    title: t("animals.color"),
    key: "color",
    // sorting: "byColorId",
    render(item: Animal) {
      return item.animalColor?.name?.[locale];
    },
  },
  // {
  //   title: t("form.gender"),
  //   key: "gender",
  //   // sorting: "byGender",
  //   render(item: Animal) {
  //     return ANIMAL_GENDERS?.[item.sex]?.[locale];
  //   },
  // },
  {
    title: t("animals.breed"),
    key: "breed",
    // sorting: "byBreed",
    render(item: Animal) {
      return item.animalBreed?.name?.[locale];
    },
  },
  {
    title: t("animals.arrivalDate"),
    key: "arrivalDate",
    render(item: Animal) {
      return new Date(item.arrivalDate!).toLocaleDateString();
    },
  },
  {
    hideInInfoTable: true,
    title: t("table.actions"),
    key: "actions",
    stopPropagationOnClick: true,
    render(item: Animal) {
      return (
        <div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start" onClick={(event) => event.stopPropagation()}>
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
