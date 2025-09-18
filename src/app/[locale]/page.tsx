import { cookies } from "next/headers";
import { UserData } from "@/shared/types";
import { getLocale } from "next-intl/server";
import { redirect } from "@/shared/i18n/routing";
import { routes } from "@/shared/constants/routes";
import { navLinksVariant } from "@/shared/constants";

export default async function Index() {
  const locale = await getLocale();
  const cookie = await cookies();
  const user: null | UserData = JSON.parse(cookie.get("USER_DATA")?.value || "null");
  if (!user) return redirect({ href: routes.AUTH.LOGIN, locale });

  return redirect({
    href: navLinksVariant[user.userRole]?.[0]?.items?.[0]?.url!,
    locale,
  });
}
