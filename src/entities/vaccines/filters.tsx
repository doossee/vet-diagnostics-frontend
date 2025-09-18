import { useI18n } from "@/shared/hooks/use-i18n";
import { DatePicker } from "@/shared/components/date-picker";
import { FiltersWrapper } from "@/shared/components/filters-wrapper";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { AnimalSelect } from "@/features/animals/components/animal-select";
import { VaccineQueryParamKeys } from "./utils/constants/vaccine-query-param-keys";
import { VaccineTypeSelect } from "@/features/vaccine-types/components/vaccine-type-select";

export function VaccineFilters() {
  const { t } = useI18n();
  const { get, set, remove } = useSearchQueryParams()
  
  const typeId = get(VaccineQueryParamKeys.TYPE_ID, true)
  const animalId = get(VaccineQueryParamKeys.ANIMAL_ID, true)
  const date = get(VaccineQueryParamKeys.DATE) as string ?? ""

  return (
    <FiltersWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
        <VaccineTypeSelect
          value={typeId}
          placeholder={t("filters.byType")}
          onChange={e => set(VaccineQueryParamKeys.TYPE_ID, e)}
          onRemove={() => remove(VaccineQueryParamKeys.TYPE_ID)}
        />

        <AnimalSelect
          value={animalId}
          placeholder={t("filters.byAnimal")}
          onRemove={() => remove(VaccineQueryParamKeys.ANIMAL_ID)}
          onChange={(e) => set(VaccineQueryParamKeys.ANIMAL_ID, e)}
        />

        <DatePicker
          onRemove={() => {remove(VaccineQueryParamKeys.DATE);console.log(VaccineQueryParamKeys.DATE)}}
          buttonClass="bg-card border border-input dark:text-white hover:bg-card"
          field={{
            value: date,
            onChange(e: any) {
              set(VaccineQueryParamKeys.DATE, e);
            },
          }}
        />
      </div>
    </FiltersWrapper>
  );
}
