import { useI18n } from "@/shared/hooks/use-i18n";
import { ANIMAL_GENDERS } from "./utils/constants/animal-genders";
import { queryParamKeys } from './utils/constants/query-param-keys';
import { FiltersWrapper } from "@/shared/components/filters-wrapper";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { BreedSelect } from "@/features/breeds/components/breed-select";
import { AnimalTypeSelect } from "@/features/animal-types/components/animal-type-select";
import { AnimalColorSelect } from "@/features/animal-colors/components/animal-color-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { AnimalTypeTreeSelect } from "@/features/animal-types/components/animal-type-tree-select";

export function AnimalFilters() {
  const { get, set, remove } = useSearchQueryParams()

  const { t, locale } = useI18n();

  const gender = get(queryParamKeys.GENDER) as string
  const typeId = get(queryParamKeys.TYPE_ID)
  // const breedId = get(queryParamKeys.BREED_ID)
  // const colorId = get(queryParamKeys.COLOR_ID)

  return (
    <FiltersWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
        <AnimalTypeTreeSelect onRemove={() => remove(queryParamKeys.TYPE_ID)} placeholder={t("filters.byType")} value={typeId} onChange={e => set(queryParamKeys.TYPE_ID, e)} />

        <Select value={gender ? gender : ""} onValueChange={(e) => set(queryParamKeys.GENDER, e)}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder={t("filters.byGender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null as any}>{t("filters.all")}</SelectItem>
            {Object.entries(ANIMAL_GENDERS).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <BreedSelect onRemove={() => remove(queryParamKeys.BREED_ID)} placeholder={t("filters.byBreed")} value={breedId} onChange={e => set(queryParamKeys.BREED_ID, e)} /> */}

        {/* <AnimalColorSelect onRemove={() => remove(queryParamKeys.COLOR_ID)} placeholder={t("filters.byColor")} value={colorId} onChange={e => set(queryParamKeys.COLOR_ID, e)} /> */}
      </div>
    </FiltersWrapper>
  );
}
