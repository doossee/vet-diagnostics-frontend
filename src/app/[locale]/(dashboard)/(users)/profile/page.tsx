"use client";

import { Loader } from "lucide-react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { ProfileForm } from "@/features/users";
import { useGetProfile } from "@/entities/auth/services/queries";
import { useUpdateProfile, useChangePassword } from "@/entities/auth/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PasswordForm } from "@/features/users/profile/password-form";

export default function Profile() {
  const { t } = useI18n();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const { data: profile, isLoading } = useGetProfile();

  return (
    <div>
      <Card className="shadow-none rounded-lg !max-w-[700px] w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t("users.changeUserData")} {isLoading && <Loader className="animate-spin size-4" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm onSubmit={updateProfile.mutateAsync} defaultValues={profile as any} loading={isLoading} />
        </CardContent>
      </Card>
      <Card className="shadow-none rounded-lg !max-w-[700px] w-full mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Изменить пароля
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordForm onSubmit={changePassword.mutateAsync} />
        </CardContent>
      </Card>
    </div>
  );
}
