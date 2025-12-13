"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/i18n/routing";
import { routes } from "@/shared/constants/routes";
import { animalsControllerCreate } from "@/shared/api";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { AnimalForm, AnimalSchema } from "@/features/animals";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function Animals() {
  const router = useRouter();
  const t = useTranslations();

  const { userData } = useAuthData();

  async function onSubmit(values: AnimalSchema) {
    try {
      const { id } = await animalsControllerCreate({
        ...values,
        ...(userData?.role === "FARMER" ? { farmerId: userData?.userId } : {}),
      } as any);

      router.push(routes.ANIMALS.ID(id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overflow-hidden">
      <Card className="shadow-none rounded-lg">
        <CardHeader>
          <CardTitle>{t("animals.animalInfo")}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <AnimalForm
            onSubmit={onSubmit}
            showFarmer={userData?.role !== "FARMER"}
            submitRightContent={<span />} />
        </CardContent>
      </Card>
    </div>
  );
}
