import { Edit, Trash } from "lucide-react";
import { LanguageLocales, User } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";

export const createUserColumns = (handleEditItem: (item: User) => void, handleDelete: (id: string) => void, t: any, locale: LanguageLocales) => [
  {
    title: t("form.name"),
    key: "name",
    render(item: User) {
      return `${item?.firstName} ${item?.lastName}`;
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
    title: t("inspections.email"),
    key: "email",
    render(item: User) {
      return item.email;
    },
  },
  {
    title: t("inspections.username"),
    key: "username",
    render(item: User) {
      return item.username;
    },
  },
  {
    title: t("form.districtName"),
    key: "district",
    // sorting: "byDistrictId",
    render(item: User) {
      return item.district?.name?.[locale];
    },
  },
  {
    title: t("inspections.createdDate"),
    key: "createdDate",
    sorting: "byCreatedDate",
    render(item: User) {
      return new Date(item.createdAt).toLocaleString();
    },
  },
  {
    title: t("table.actions"),
    key: "actions",
    render(item: User) {
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
