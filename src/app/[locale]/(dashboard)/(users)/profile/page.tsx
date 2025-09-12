"use client";

import { Loader } from "lucide-react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useProfile } from "@/shared/hooks/queries";
import { usersControllerUpdate } from "@/shared/api";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { ProfileForm, ProfileSchema } from "@/features/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function Veterinarians() {
  const { t } = useI18n();
  const { userData } = useAuthData();
  const { data: profile, isLoading } = useProfile(userData?.userId!);

  async function onSubmit(values: ProfileSchema) {
    try {
      const { password, ...others } = values;
      if (password?.trim()) (others as any).password = password;
      // TODO: update mutation
      await usersControllerUpdate(userData?.userId!, others as any);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Card className="shadow-none rounded-lg !max-w-[700px] w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t("users.changeUserData")} {isLoading && <Loader className="animate-spin size-4" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm onSubmit={onSubmit} defaultValues={profile as any} loading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
