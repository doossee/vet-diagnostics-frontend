import { GENDERS } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";
import { FiltersWrapper } from "@/shared/components/filters-wrapper";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { RegionSelect } from "@/features/regions/components/region-select";
import { UsersQueryParamKeys } from './utils/constants/users-query-param-keys';
import { DistrictSelect } from "@/features/districts/components/district-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export function UserFilters() {
  const { t, locale } = useI18n();
  const { get, set, remove } = useSearchQueryParams()

  const gender = get(UsersQueryParamKeys.GENDER) as string ?? ""
  // const birthDate = get(UsersQueryParamKeys.BIRTH_DATE)
  const regionId = get(UsersQueryParamKeys.REGION_ID, true)
  const districtId = get(UsersQueryParamKeys.DISTRICT_ID, true)

  return (
    <FiltersWrapper>
      <div className="flex items-center justify-start gap-2 mb-2">
        <Select value={gender} onValueChange={(e) => set(UsersQueryParamKeys.GENDER, e)}>
          <SelectTrigger className="bg-card w-min">
            <SelectValue placeholder={t("filters.byGender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null as any}>{t("filters.all")}</SelectItem>
            {GENDERS.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <RegionSelect placeholder={t("filters.byRegion")} onRemove={() => remove(UsersQueryParamKeys.REGION_ID)} value={regionId} onChange={(e) => set(UsersQueryParamKeys.REGION_ID, e)} />
        
        <DistrictSelect placeholder={t("filters.byDistrict")} onRemove={() => remove(UsersQueryParamKeys.DISTRICT_ID)} value={districtId} onChange={e => set(UsersQueryParamKeys.DISTRICT_ID, e)} regionId={regionId as number} disabled={!regionId} />
      </div>
    </FiltersWrapper>
  );
}
