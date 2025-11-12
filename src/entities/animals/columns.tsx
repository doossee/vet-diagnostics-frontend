import { Edit, Trash } from "lucide-react";
import { ANIMAL_GENDERS } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { Animal, LanguageLocales } from "@/shared/types";

export const createAnimalColumns = (handleEditItem: (item: Animal) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  { title: t("animals.name"), key: "nameOrCode" },
  {
    title: t("animals.age"),
    key: "age",
    sorting: "byBirthDate",
    render(item: Animal) {
      return new Date().getFullYear() - new Date(item.birthDate!).getFullYear();
    },
  },
  {
    title: t("form.type"),
    key: "type",
    sorting: "byTypeId",
    render(item: Animal) {
      return item.type?.name;
    },
  },
  {
    title: t("animals.color"),
    key: "color",
    sorting: "byColorId",
    render(item: Animal) {
      return item.color?.name;
    },
  },
  { title: t("animals.weight"), key: "weight" },
  {
    title: t("form.gender"),
    key: "gender",
    sorting: "byGender",
    render(item: Animal) {
      return ANIMAL_GENDERS.find((g) => g.value === item.gender)?.[locale];
    },
  },
  {
    title: t("animals.breed"),
    key: "breed",
    sorting: "byBreed",
    render(item: Animal) {
      return item.breed?.name;
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
    title: t("table.actions"),
    key: "actions",
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
