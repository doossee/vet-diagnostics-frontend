import { useI18n } from '@/shared/hooks/use-i18n'
import { VaccineType, Animal } from '@/shared/types'
import { DatePicker } from '@/shared/components/date-picker'
import { FiltersWrapper } from '@/shared/components/filters-wrapper'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

export const vaccineFilters = {
    date: null as Date | null,
    typeId: null as number | null,
    animalId: null as number | null,
}

interface VaccineFiltersProps {
    animals: Animal[]
    vaccineTypes: VaccineType[]
    filters: typeof vaccineFilters
    setFilters: (prev: any) => any
}

export function VaccineFilters({ setFilters, filters, vaccineTypes, animals }: VaccineFiltersProps) {
    const { t } = useI18n()

    return (<FiltersWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
            <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t("filters.byType")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t("filters.all")}</SelectItem>
                    {
                        vaccineTypes.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <Select value={filters.animalId?String(filters.animalId):""} onValueChange={e => setFilters({...filters, animalId: +e})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t("filters.byAnimal")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t("filters.all")}</SelectItem>
                    {
                        animals.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <DatePicker buttonClass="bg-card border border-input dark:text-white hover:bg-card" field={{value: filters.date, onChange(date: any) {setFilters({...filters, date })}}} />
        </div>
    </FiltersWrapper>)
}