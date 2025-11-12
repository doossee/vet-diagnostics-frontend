"use client";

import { Loader } from "lucide-react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { ProfileForm, ProfileSchema } from "@/features/users";
import { useGetProfile } from "@/entities/auth/services/queries";
import { useUpdateProfile } from "@/entities/auth/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function Veterinarians() {
  const { t } = useI18n();
  const { userData } = useAuthData();
  const { mutateAsync } = useUpdateProfile()
  const { data: profile, isLoading } = useGetProfile(userData?.userId!);

  async function onSubmit(values: ProfileSchema) {
    try {
      const { password, ...others } = values;

      if (password?.trim()) Object.assign(others, { password })

      await mutateAsync({id: userData?.userId!, body: others});
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
          <ProfileForm onSubmit={onSubmit} defaultValues={profile as any} loading={isLoading || isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
