import { Edit, Trash } from "lucide-react";
import { GENDERS } from "@/shared/constants";
import { LanguageLocales, User } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";

export const createUserColums = (handleEditItem: (item: User) => void, handleDelete: (id: number) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.name"),
    key: "name",
    render(item: User) {
      return `${item.firstName} ${item.lastName}`;
    },
  },
  {
    title: t("form.phone"),
    key: "phone",
    render(item: User) {
      return item.phone;
    },
  },
  {
    title: t("form.address"),
    key: "address",
    render(item: User) {
      return item.address;
    },
  },
  {
    title: t("form.gender"),
    key: "gender",
    sorting: "byGender",
    render(item: User) {
      return GENDERS.find((g) => g.value === item.gender)?.[locale];
    },
  },
  {
    title: t("form.birthDate"),
    key: "birthdate",
    sorting: "byBirthDate",
    render(item: User) {
      return new Date(item.birthDate!).toDateString();
    },
  },
  {
    title: t("form.districtName"),
    key: "district",
    sorting: "byDistrictId",
    render(item: User) {
      return item.district?.name;
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: User) {
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
