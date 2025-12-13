import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { PROPHYLAXIS_TYPES, PROPHYLAXIS_TYPES_ARRAY } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { PROPHYLAXIS_QUERY_PARAM_KEYS } from "@/entities/prophylaxis/utils/constants/query-param-keys";
import { useI18n } from "@/shared/hooks/use-i18n";

export function ProphylaxisSegmented() {
  const { t } = useI18n();
  const { get, set, remove } = useSearchQueryParams()
  const [segmented, setSegmented] = useState<string>('all')

  const paramKey = PROPHYLAXIS_QUERY_PARAM_KEYS.type

  const options = [
    { key: 'all', value: t("inspections.all") },
    ...Object.entries(PROPHYLAXIS_TYPES)
      .map(([key, value]) => ({ key, value }))
  ]

  const handleChangeSegmented = (value: string) => {
    if(value === 'all') remove(paramKey)
    else set(paramKey, value)

    setSegmented(value)
  }

  return (
    <div className="mb-2">
      <Tabs value={segmented}>
        <TabsList>
          {
            options.map(({key, value}) =>
              <TabsTrigger key={key} value={key} onClick={() => handleChangeSegmented(key)}>
                {value}
              </TabsTrigger>)
          }
        </TabsList>
      </Tabs>
    </div>
  )
}