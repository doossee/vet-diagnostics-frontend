import { Edit, FileCheck, Trash } from "lucide-react";

import { LanguageLocales, MedicalSession } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { CopyIdButton } from "@/shared/components/copy-id-button";
import { Badge } from "@/shared/components/ui/badge";
import { SESSION_STATUSES } from "./utils/constants/session-statuses";

export const createMedicalSessionsColumns = (
  handleEditItem: (item: MedicalSession) => void,
  handleDelete: (id: number | string) => void,
  handleSubmitSession: (id: number | string) => void,
  t: any,
  locale: LanguageLocales
) => [
    {
      hideInInfoTable: true,
      title: t("form.animal"),
      key: "animal",
      render(item: MedicalSession) {
        return item.animal?.animalNameCode
      }
    },
    {
      title: "Veterinarian", key: "veterinarian", render(item: MedicalSession) {
        return item?.veterinarian?.user?.firstName ?? "-"
      }
    },
    {
      title: t("form.date"), key: "date", render(item: MedicalSession) {
        return new Date(item.date).toLocaleDateString()
      }
    },
    {
      title: "Notes", key: "notes", render(item: MedicalSession) {
        return item.notes || "-"
      }
    },
    {
      title: "Status", key: "status", render(item: MedicalSession) {
        const status = SESSION_STATUSES[item.status]

        return <Badge className={status.className}>
          {status.label[locale]}
        </Badge>
      }
    },
    {
      hideInInfoTable: true,
      title: t("table.actions"),
      stopPropagationOnClick: true,
      key: "actions",
      render(item: MedicalSession) {
        const isReadyForSubmit =
          item.status !== "SUBMITTED" &&
          item.fecesExam &&
          item.urineExam &&
          item.bloodExam &&
          item.clinicalExam &&
          (item.mucosaExams?.length ?? 0) > 0;

        return (
          <div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
            <CopyIdButton id={item.id} />
            <Button disabled={!isReadyForSubmit} onClick={() => handleSubmitSession(item.id)} size="sm" className="text-xs!">
              <FileCheck />
              Отправять
            </Button>
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
