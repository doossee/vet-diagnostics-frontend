import { routing } from "./routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const [common, nav, auth, animals, sessions, users, regions, management, inspections, validation, pages, prediction, statistics] =
    await Promise.all([
      import(`../messages/${locale}/common.json`),
      import(`../messages/${locale}/nav.json`),
      import(`../messages/${locale}/auth.json`),
      import(`../messages/${locale}/animals.json`),
      import(`../messages/${locale}/sessions.json`),
      import(`../messages/${locale}/users.json`),
      import(`../messages/${locale}/regions.json`),
      import(`../messages/${locale}/management.json`),
      import(`../messages/${locale}/inspections.json`),
      import(`../messages/${locale}/validation.json`),
      import(`../messages/${locale}/pages.json`),
      import(`../messages/${locale}/prediction.json`),
      import(`../messages/${locale}/statistics.json`),
    ]);

  return {
    locale,
    messages: {
      ...common.default,
      nav: nav.default,
      login: auth.default,
      ...animals.default,
      sessions: sessions.default,
      users: users.default,
      regions: regions.default,
      management: management.default,
      inspections: inspections.default,
      required: validation.default,
      pages: pages.default,
      prediction: prediction.default,
      statistics: statistics.default,
    },
  };
});
