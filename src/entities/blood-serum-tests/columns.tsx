import { BLOOD_SERUM_TESTS } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { BloodSerumTest, BLOOD_SERUM } from "@/shared/types";
import { Edit, Trash } from "lucide-react";

export const createBloodSerumTestColums = (handleEditItem: (item: BloodSerumTest) => void, handleDelete: (id: number) => void, t: any, locale: "uz" | "ru") => [
  {
    title: t("form.animal"),
    key: "animal",
    render(item: BloodSerumTest) {
      return item.animal?.nameOrCode;
    },
  },
  ...Object.keys(BLOOD_SERUM_TESTS).map((key) => ({
    key,
    title: BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale],
    render: (item: BloodSerumTest) => {
      return <span className="text-right">{item[key as BLOOD_SERUM] + " " + BLOOD_SERUM_TESTS[key as BLOOD_SERUM][`unit_${locale}`]}</span>;
    },
  })),
  {
    title: t("table.actions"),
    key: "actions",
    render(item: BloodSerumTest) {
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
