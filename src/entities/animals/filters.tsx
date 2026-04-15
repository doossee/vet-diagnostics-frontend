import { useI18n } from "@/shared/hooks/use-i18n";
import { queryParamKeys } from './utils/constants/query-param-keys';
import { FiltersWrapper } from "@/shared/components/filters-wrapper";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { AnimalTypeTreeSelect } from "@/features/animal-types/components/animal-type-tree-select";
import { AnimalSexSelect } from "@/features/additional-crud/components/animal-sex-select";
// import { BreedSelect } from "@/features/breeds/components/breed-select";
// import { AnimalColorSelect } from "@/features/animal-colors/components/animal-color-select";

export function AnimalFilters() {
  const { get, set, remove } = useSearchQueryParams();
  const { t } = useI18n();

  const gender  = get(queryParamKeys.GENDER)  as string;
  const typeId  = get(queryParamKeys.TYPE_ID)  as string;
  // const breedId = get(queryParamKeys.BREED_ID) as string;
  // const colorId = get(queryParamKeys.COLOR_ID) as string;

  return (
    <FiltersWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
        <AnimalTypeTreeSelect
          onRemove={() => remove(queryParamKeys.TYPE_ID)}
          placeholder={t("filters.byType")}
          value={typeId}
          onChange={e => set(queryParamKeys.TYPE_ID, e)}
        />
        <AnimalSexSelect
          value={gender ?? ""}
          placeholder={t("filters.byGender")}
          onChange={e => set(queryParamKeys.GENDER, e)}
        />
        {/* <BreedSelect
          onRemove={() => remove(queryParamKeys.BREED_ID)}
          placeholder={t("filters.byBreed")}
          value={""}
          onChange={e => set(queryParamKeys.BREED_ID, e as string)}
        />
        <AnimalColorSelect
          onRemove={() => remove(queryParamKeys.COLOR_ID)}
          placeholder={t("filters.byColor")}
          value={""}
          onChange={e => set(queryParamKeys.COLOR_ID, e as string)}
        /> */}
      </div>
    </FiltersWrapper>
  );
}
