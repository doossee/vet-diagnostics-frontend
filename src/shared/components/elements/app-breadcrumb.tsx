"use client";

import { links, QUERY_PARAM_KEYS } from "@/shared/constants";
import { useTranslations } from "next-intl";
import { ChevronsRight, Home } from "lucide-react";
import { useIsClient } from "@/shared/hooks/use-client";
import { Fragment, ReactNode, useCallback, useMemo } from "react";
import { Link, usePathname } from "@/shared/i18n/routing";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { splitPathParam } from "@/shared/helpers/split-path-params";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetAnimal } from "@/entities/animals/services/animal-queries";
import { Skeleton } from "../ui/skeleton";
import { isUUID } from "@/shared/helpers/is-uuid";
import { SkeletonWrapper } from "./skeleton-wrapper";

const ANIMAL_CONTEXT_PAGES = new Set([
  links.diseases.url,
  links.prophylaxis.url,
  links["dung-tests"].url,
  links["urine-tests"].url,
  links["mucosa-exams"].url,
  links["general-blood-tests"].url,
  links["general-inspections"].url,
  links["sessions"].url,
]);

export function AppBreadcrumb() {
  const t = useTranslations();
  const isClient = useIsClient();
  const pathname = usePathname();
  const { userData } = useAuthData();
  const { get } = useSearchQueryParams();

  const [path, param] = splitPathParam(pathname);
  const [firstParam, ...restParams] = (param ?? "").split("/");
  const subPath = restParams.join("/");
  const page = links[(path)?.replaceAll('/', '') as keyof typeof links];

  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const hasEntityContext = page.url === links.animals.url && isUUID(firstParam);
  const hasAnimalContext = Boolean(animalId && page?.url && ANIMAL_CONTEXT_PAGES.has(page.url))

  const animalQueryId = animalId ?? (isUUID(firstParam) ? firstParam : undefined);

  const { data: animal, isLoading: animalIsLoading } = useGetAnimal(
    animalQueryId ? String(animalQueryId) : "",
    hasAnimalContext || hasEntityContext
  );

  const items = useMemo(() => {
    const paths: { root: ReactNode; link?: string }[] = [{ root: <Home size={18} />, link: "/" }];

    if (hasAnimalContext) {
      paths.push({
        root: <SkeletonWrapper loading={animalIsLoading}>
          {animal?.animalNameCode}
        </SkeletonWrapper>,
        link: links.animals.url + `/${animalId}`,
      });
    }

    paths.push({
      root: (
        <span className="text-sm flex items-center gap-2">
          {page?.icon && <page.icon size={18} />}
          <span className="hidden md:inline">
            {page?.title && t(page.title)}
          </span>
        </span>
      ),
      ...(page?.url && { link: subPath && isUUID(firstParam) ? `${page.url}/${firstParam}` : page.url }),
    });

    if (isUUID(firstParam)) {
      if (animal || animalIsLoading) {
        paths.push({
          root: <SkeletonWrapper loading={animalIsLoading}>
            {animal?.animalNameCode}
          </SkeletonWrapper>,
          ...(subPath && { link: `${page?.url}/${firstParam}` }),
        });
      }
      if (subPath) {
        const SUB_PATH_LABELS: Record<string, string> = {
          prediction: t("prediction.aiTitle"),
        };
        paths.push({
          root: SUB_PATH_LABELS[subPath] ?? subPath,
        });
      }
    } else if (param) {
      paths.push({
        root: param,
      });
    }

    return paths;
  }, [path, param, links, animalIsLoading, animal, t]);

  if (!isClient || !userData) return null;

  return (
    <Breadcrumb className="bg-card py-1.5 px-3 border rounded">
      <BreadcrumbList>
        {items.map((path, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {items.length == index + 1 ? (
                <BreadcrumbPage>{path.root}</BreadcrumbPage>
              ) : (
                path.link && (
                  <BreadcrumbLink asChild>
                    <Link href={path.link} className="text-[13px] text-card-foreground flex items-center gap-2">
                      {path.root}
                    </Link>
                  </BreadcrumbLink>
                )
              )}
            </BreadcrumbItem>
            {items.length !== index + 1 && (
              <BreadcrumbSeparator>
                <ChevronsRight />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
