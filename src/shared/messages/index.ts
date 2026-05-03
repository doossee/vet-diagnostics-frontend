import type common from "./uz/common.json";
import type nav from "./uz/nav.json";
import type auth from "./uz/auth.json";
import type animals from "./uz/animals.json";
import type sessions from "./uz/sessions.json";
import type users from "./uz/users.json";
import type regions from "./uz/regions.json";
import type management from "./uz/management.json";
import type inspections from "./uz/inspections.json";
import type validation from "./uz/validation.json";
import type pages from "./uz/pages.json";
import type prediction from "./uz/prediction.json";
import type statistics from "./uz/statistics.json";

export type Messages = typeof common & {
  nav: typeof nav;
  login: typeof auth;
  animalTypes: (typeof animals)["animalTypes"];
  animals: (typeof animals)["animals"];
  sessions: typeof sessions;
  users: typeof users;
  regions: typeof regions;
  management: typeof management;
  inspections: typeof inspections;
  required: typeof validation;
  pages: typeof pages;
  prediction: typeof prediction;
  statistics: typeof statistics;
};
