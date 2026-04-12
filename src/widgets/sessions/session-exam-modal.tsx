"use client";

import { useQueryClient } from "@tanstack/react-query";

import { Modal } from "@/shared/components/elements/modal";
import { useI18n } from "@/shared/hooks/use-i18n";
import { BloodExam, ClinicalExam, FecesExam, UrineExam } from "@/shared/types";
import { SessionsQueryKeys } from "@/entities/sessions/utils/constants/query-keys";

import { GeneralBloodTestForm, GeneralBloodTestSchema, generalBloodTestValues } from "@/features/general-blood-tests";
import { GeneralInspectionForm, GeneralInspectionSchema, generalInspectionValues } from "@/features/general-inspections";
import { UrineTestForm, UrineTestSchema, urineTestValues } from "@/features/urine-tests";
import { DungTestForm, DungTestSchema, dungTestValues } from "@/features/dung-tests";

import { useCreateGeneralBloodTest, useUpdateGeneralBloodTest } from "@/entities/general-blood-tests/services/mutations";
import { useCreateGeneralInspection, useUpdateGeneralInspection } from "@/entities/general-inspections/services/mutations";
import { useCreateUrineTest, useUpdateUrineTest } from "@/entities/urine-tests/services/mutations";
import { useCreateDungTest, useUpdateDungTest } from "@/entities/dung-tests/services/mutations";

export type SessionExamType = "blood" | "clinical" | "urine" | "feces";

interface Props {
  type: SessionExamType | null;
  open: boolean;
  onClose: () => void;
  sessionId: string;
  animalId: string;
  bloodExam?: BloodExam | null;
  clinicalExam?: ClinicalExam | null;
  urineExam?: UrineExam | null;
  fecesExam?: FecesExam | null;
}

function useSessionInvalidate(sessionId: string) {
  const client = useQueryClient();
  return () =>
    client.invalidateQueries({ queryKey: [SessionsQueryKeys.SESSIONS_BY_ID, sessionId] });
}

export function SessionExamModal({ type, open, onClose, sessionId, animalId, bloodExam, clinicalExam, urineExam, fecesExam }: Props) {
  const { t } = useI18n();
  const invalidateSession = useSessionInvalidate(sessionId);

  const createBlood = useCreateGeneralBloodTest();
  const updateBlood = useUpdateGeneralBloodTest();
  const createClinical = useCreateGeneralInspection();
  const updateClinical = useUpdateGeneralInspection();
  const createUrine = useCreateUrineTest();
  const updateUrine = useUpdateUrineTest();
  const createFeces = useCreateDungTest();
  const updateFeces = useUpdateDungTest();

  async function handleBloodSubmit(values: GeneralBloodTestSchema) {
    try {
      if (bloodExam?.id) {
        await updateBlood.mutateAsync({ id: bloodExam.id, body: values });
      } else {
        await createBlood.mutateAsync(values);
      }
      await invalidateSession();
      onClose();
    } catch {}
  }

  async function handleClinicalSubmit(values: GeneralInspectionSchema) {
    try {
      if (clinicalExam?.id) {
        await updateClinical.mutateAsync({ id: clinicalExam.id, body: values });
      } else {
        await createClinical.mutateAsync(values);
      }
      await invalidateSession();
      onClose();
    } catch {}
  }

  async function handleUrineSubmit(values: UrineTestSchema) {
    try {
      if (urineExam?.id) {
        await updateUrine.mutateAsync({ id: urineExam.id, body: values });
      } else {
        await createUrine.mutateAsync(values);
      }
      await invalidateSession();
      onClose();
    } catch {}
  }

  async function handleFecesSubmit(values: DungTestSchema) {
    try {
      if (fecesExam?.id) {
        await updateFeces.mutateAsync({ id: fecesExam.id, body: values });
      } else {
        await createFeces.mutateAsync(values);
      }
      await invalidateSession();
      onClose();
    } catch {}
  }

  const titles: Record<SessionExamType, { create: string; edit: string }> = {
    blood: { create: t("inspections.createBloodTest"), edit: t("inspections.editBloodTest") },
    clinical: { create: t("inspections.createGeneralInspections"), edit: t("inspections.editGeneralInspections") },
    urine: { create: t("inspections.createUrineTest"), edit: t("inspections.editUrineTest") },
    feces: { create: t("inspections.createDungTest"), edit: t("inspections.editDungTest") },
  };

  const getTitle = () => {
    if (!type) return "";
    const t = titles[type];
    const hasData = { blood: !!bloodExam, clinical: !!clinicalExam, urine: !!urineExam, feces: !!fecesExam }[type];
    return hasData ? t.edit : t.create;
  };

  const widthMap: Record<SessionExamType, string> = {
    blood: "max-w-[900px]!",
    clinical: "max-w-[900px]!",
    urine: "max-w-[700px]!",
    feces: "max-w-[700px]!",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={getTitle()}
      widthClassName={type ? widthMap[type] : undefined}
    >
      {type === "blood" && (
        <GeneralBloodTestForm
          animalId={animalId}
          onSubmit={handleBloodSubmit}
          defaultValues={
            bloodExam
              ? (bloodExam as any)
              : generalBloodTestValues(animalId, sessionId)
          }
        />
      )}

      {type === "clinical" && (
        <GeneralInspectionForm
          onSubmit={handleClinicalSubmit}
          defaultValues={
            clinicalExam
              ? (clinicalExam as any)
              : { ...generalInspectionValues, animalId, sessionId }
          }
        />
      )}

      {type === "urine" && (
        <UrineTestForm
          onSubmit={handleUrineSubmit}
          defaultValues={
            urineExam
              ? (urineExam as any)
              : { ...urineTestValues, animalId, sessionId }
          }
        />
      )}

      {type === "feces" && (
        <DungTestForm
          onSubmit={handleFecesSubmit}
          defaultValues={
            fecesExam
              ? (fecesExam as any)
              : { ...dungTestValues, animalId, sessionId }
          }
        />
      )}
    </Modal>
  );
}
