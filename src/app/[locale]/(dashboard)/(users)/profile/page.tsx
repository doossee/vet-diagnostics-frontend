"use client";

import { Loader } from "lucide-react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { ProfileForm, ProfileSchema } from "@/features/users";
import { useGetProfile } from "@/entities/auth/services/queries";
import { useUpdateProfile } from "@/entities/auth/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function Profile() {
  const { t } = useI18n();
  const { mutateAsync } = useUpdateProfile()
  const { data: profile, isLoading } = useGetProfile();

  async function onSubmit(values: ProfileSchema) {
    try {
      const { password, ...body } = values;

      if (password?.trim()) Object.assign(body, { password })

      await mutateAsync(body);
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
